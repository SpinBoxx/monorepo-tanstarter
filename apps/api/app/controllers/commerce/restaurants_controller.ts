import type { HttpContext } from '@adonisjs/core/http';
import Restaurant from '#models/restaurant';
import RestaurantTransformer from '#transformers/restaurant-transformer';
import {
  createRestaurantValidator,
  listCatalogValidator,
  updateRestaurantValidator,
} from '#validators/commerce/catalog.validator';

export default class RestaurantsController {
  async index({ auth, request, serialize }: HttpContext) {
    const filters = await request.validateUsing(listCatalogValidator);
    const query = Restaurant.query()
      .preload('categories', (categories) =>
        categories.orderBy('displayOrder', 'asc'),
      )
      .orderBy('createdAt', 'desc');

    const user = auth.isAuthenticated ? auth.getUserOrFail() : undefined;

    if (user) {
      query.withCount('favorites', (favorites) =>
        favorites.where('userId', user.id).as('isFavorite'),
      );
    }

    if (filters.search) {
      query.where((builder) => {
        builder
          .whereILike('name', `%${filters.search}%`)
          .orWhereILike('city', `%${filters.search}%`)
          .orWhereILike('slug', `%${filters.search}%`);
      });
    }

    if (filters.status) {
      query.where('status', filters.status);
    }

    const restaurants = await query.paginate(
      filters.page ?? 1,
      filters.limit ?? 10,
    );

    return serialize(
      RestaurantTransformer.paginate(restaurants.all(), restaurants.getMeta()),
    );
  }

  async show({ auth, params, response, serialize }: HttpContext) {
    const query = Restaurant.query()
      .where('id', params.id)
      .preload('categories', (categories) =>
        categories
          .orderBy('displayOrder', 'asc')
          .preload('menuItems', (items) =>
            items
              .orderBy('displayOrder', 'asc')
              .preload('variants', (variants) =>
                variants.orderBy('displayOrder', 'asc'),
              )
              .preload('optionGroups', (groups) =>
                groups
                  .orderBy('displayOrder', 'asc')
                  .preload('options', (options) =>
                    options.orderBy('displayOrder', 'asc'),
                  ),
              ),
          ),
      );

    const user = auth.isAuthenticated ? auth.getUserOrFail() : undefined;

    if (user) {
      query.withCount('favorites', (favorites) =>
        favorites.where('userId', user.id).as('isFavorite'),
      );
    }

    const restaurant = await query.first();

    if (!restaurant) {
      return response.notFound({ message: 'Restaurant not found' });
    }

    return serialize(
      RestaurantTransformer.transform(restaurant).useVariant('forDetailedView'),
    );
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createRestaurantValidator);
    const restaurant = await Restaurant.create(payload);

    return response.created(restaurant);
  }

  async update({ params, request, response }: HttpContext) {
    const restaurant = await Restaurant.find(params.id);

    if (!restaurant) {
      return response.notFound({ message: 'Restaurant not found' });
    }

    const payload = await request.validateUsing(updateRestaurantValidator);
    restaurant.merge(payload);
    await restaurant.save();

    return restaurant;
  }

  async destroy({ params, response }: HttpContext) {
    const restaurant = await Restaurant.find(params.id);

    if (!restaurant) {
      return response.notFound({ message: 'Restaurant not found' });
    }

    await restaurant.delete();

    return { message: 'Restaurant deleted successfully' };
  }
}
