import db from '@adonisjs/lucid/services/db';
import { test } from '@japa/runner';
import Favorite from '#models/favorite';
import Restaurant from '#models/restaurant';
import User from '#models/user';

const createUser = (email = `user.${Date.now()}@example.com`) => {
  return User.create({
    fullName: 'Jane Doe',
    email,
    password: 'password123',
  });
};

const createRestaurant = (slug = `restaurant-${Date.now()}`) => {
  return Restaurant.create({
    name: 'Burger Station',
    slug,
    description: 'Fast-food urbain specialise dans les burgers.',
    imageUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9',
    phone: '+33102030405',
    email: 'hello@burger-station.test',
    addressLine1: '12 Avenue des Burgers',
    addressLine2: null,
    city: 'Paris',
    postalCode: '75011',
    country: 'FR',
    latitude: 48.8566,
    longitude: 2.3522,
    openingHours: null,
    deliveryRadiusMeters: 4500,
    minimumOrderCents: 1000,
    status: 'open',
  });
};

const countFavoritesFor = async (userId: number) => {
  const count = await Favorite.query()
    .where('userId', userId)
    .count('* as total')
    .first();

  return Number(count?.$extras.total ?? 0);
};

test.group('favorites', (group) => {
  group.each.setup(async () => {
    await db.from('auth_access_tokens').delete();
    await Favorite.query().delete();
    await Restaurant.query().delete();
    await User.query().delete();
  });

  test('restaurants list exposes isFavorite false for guests', async ({
    client,
    assert,
  }) => {
    await createRestaurant();

    const response = await client.get('/api/v1/restaurants');

    response.assertStatus(200);
    const body = response.body() as { data: Array<{ isFavorite: boolean }> };
    const restaurant = body.data[0];

    assert.exists(restaurant);
    if (!restaurant) return;
    assert.isFalse(restaurant.isFavorite);
  });

  test('restaurants list marks only favorites for the authenticated user', async ({
    client,
    assert,
  }) => {
    const user = await createUser();
    const favoriteRestaurant = await createRestaurant('favorite-restaurant');
    const otherRestaurant = await createRestaurant('other-restaurant');
    await Favorite.create({
      userId: user.id,
      favoritableType: 'restaurant',
      favoritableId: favoriteRestaurant.id,
    });

    const response = await client.get('/api/v1/restaurants').loginAs(user);

    response.assertStatus(200);
    const body = response.body() as {
      data: Array<{ id: number; isFavorite: boolean }>;
    };
    const favoritesById = new Map(
      body.data.map((restaurant) => [restaurant.id, restaurant.isFavorite]),
    );

    assert.isTrue(favoritesById.get(favoriteRestaurant.id));
    assert.isFalse(favoritesById.get(otherRestaurant.id));
  });

  test('restaurant detail exposes isFavorite for the authenticated user', async ({
    client,
    assert,
  }) => {
    const user = await createUser();
    const restaurant = await createRestaurant();
    await Favorite.create({
      userId: user.id,
      favoritableType: 'restaurant',
      favoritableId: restaurant.id,
    });

    const response = await client
      .get(`/api/v1/restaurants/${restaurant.id}`)
      .loginAs(user);

    response.assertStatus(200);
    const body = response.body() as { data: { isFavorite: boolean } };
    assert.isTrue(body.data.isFavorite);
  });

  test('favorite creation and deletion are idempotent', async ({
    client,
    assert,
  }) => {
    const user = await createUser();
    const restaurant = await createRestaurant();
    const payload = {
      type: 'restaurant',
      targetId: restaurant.id,
    };

    const firstCreate = await client
      .post('/api/v1/favorites')
      .json(payload)
      .loginAs(user);
    const secondCreate = await client
      .post('/api/v1/favorites')
      .json(payload)
      .loginAs(user);

    firstCreate.assertStatus(200);
    secondCreate.assertStatus(200);
    firstCreate.assertBodyContains({
      data: {
        type: 'restaurant',
        targetId: restaurant.id,
        isFavorite: true,
      },
    });
    assert.equal(await countFavoritesFor(user.id), 1);

    const firstDelete = await client
      .delete(`/api/v1/favorites?type=restaurant&targetId=${restaurant.id}`)
      .loginAs(user);
    const secondDelete = await client
      .delete(`/api/v1/favorites?type=restaurant&targetId=${restaurant.id}`)
      .loginAs(user);

    firstDelete.assertStatus(200);
    secondDelete.assertStatus(200);
    firstDelete.assertBodyContains({
      data: {
        type: 'restaurant',
        targetId: restaurant.id,
        isFavorite: false,
      },
    });
    assert.equal(await countFavoritesFor(user.id), 0);
  });

  test('favorites list returns favorite restaurants for the authenticated user', async ({
    client,
    assert,
  }) => {
    const user = await createUser();
    const restaurant = await createRestaurant();
    await Favorite.create({
      userId: user.id,
      favoritableType: 'restaurant',
      favoritableId: restaurant.id,
    });

    const response = await client
      .get('/api/v1/favorites?type=restaurant')
      .loginAs(user);

    response.assertStatus(200);
    const body = response.body() as {
      data: Array<{ type: string; targetId: number; isFavorite: boolean }>;
    };
    assert.lengthOf(body.data, 1);
    const favorite = body.data[0];

    assert.exists(favorite);
    if (!favorite) return;
    assert.equal(favorite.type, 'restaurant');
    assert.equal(favorite.targetId, restaurant.id);
    assert.isTrue(favorite.isFavorite);
  });

  test('restaurants list marks favorites created through the favorites endpoint', async ({
    client,
    assert,
  }) => {
    const user = await createUser();
    const restaurant = await createRestaurant();

    const favoriteResponse = await client
      .post('/api/v1/favorites')
      .json({
        type: 'restaurant',
        targetId: restaurant.id,
      })
      .loginAs(user);
    favoriteResponse.assertStatus(200);

    const restaurantsResponse = await client
      .get('/api/v1/restaurants')
      .loginAs(user);

    restaurantsResponse.assertStatus(200);
    const body = restaurantsResponse.body() as {
      data: Array<{ id: number; isFavorite: boolean }>;
    };
    const favorite = body.data.find((item) => item.id === restaurant.id);

    assert.exists(favorite);
    if (!favorite) return;
    assert.isTrue(favorite.isFavorite);
  });

  test('favorites endpoints reject invalid type and missing resources', async ({
    client,
  }) => {
    const user = await createUser();

    const invalidType = await client
      .post('/api/v1/favorites')
      .json({ type: 'unknown', targetId: 1 })
      .loginAs(user);
    invalidType.assertStatus(422);

    const missingResource = await client
      .post('/api/v1/favorites')
      .json({ type: 'restaurant', targetId: 999_999 })
      .loginAs(user);
    missingResource.assertStatus(404);
  });

  test('favorites endpoints require authentication', async ({ client }) => {
    const response = await client.get('/api/v1/favorites?type=restaurant');

    response.assertStatus(401);
  });
});
