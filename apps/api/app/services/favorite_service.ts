import Favorite from '#models/favorite';
import Restaurant from '#models/restaurant';
import type User from '#models/user';
import type { FavoritableType } from '#types/favorite';
import { FAVORITABLE_TYPES } from '#types/favorite';

type FavoritableModel = {
  id: number;
  $extras: Record<string, unknown>;
};

type FavoriteAction = {
  type: FavoritableType;
  targetId: number;
  isFavorite: boolean;
};

type FavoriteListOptions = {
  page?: number;
  limit?: number;
};

export default class FavoriteService {
  static async add(
    user: User,
    type: FavoritableType,
    targetId: number,
  ): Promise<FavoriteAction | null> {
    const resourceExists = await this.resourceExists(type, targetId);

    if (!resourceExists) {
      return null;
    }

    await Favorite.firstOrCreate({
      userId: user.id,
      favoritableType: type,
      favoritableId: targetId,
    });

    return {
      type,
      targetId,
      isFavorite: true,
    };
  }

  static async remove(
    user: User,
    type: FavoritableType,
    targetId: number,
  ): Promise<FavoriteAction | null> {
    const resourceExists = await this.resourceExists(type, targetId);

    if (!resourceExists) {
      return null;
    }

    await Favorite.query()
      .where('userId', user.id)
      .where('favoritableType', type)
      .where('favoritableId', targetId)
      .delete();

    return {
      type,
      targetId,
      isFavorite: false,
    };
  }

  static async list(
    user: User,
    type: FavoritableType,
    options: FavoriteListOptions,
  ) {
    const page = options.page ?? 1;
    const limit = options.limit ?? 20;
    const favorites = await Favorite.query()
      .where('userId', user.id)
      .where('favoritableType', type)
      .orderBy('createdAt', 'desc')
      .paginate(page, limit);

    return {
      rows: favorites.all(),
      meta: favorites.getMeta(),
    };
  }

  static async markFavorites<T extends FavoritableModel>(
    user: User | undefined,
    type: FavoritableType,
    models: T[],
  ) {
    if (models.length === 0) return models;

    if (!user) {
      for (const model of models) {
        model.$extras.isFavorite = false;
      }
      return models;
    }

    const targetIds = models.map((model) => model.id);
    const favorites = await Favorite.query()
      .where('userId', user.id)
      .where('favoritableType', type)
      .whereIn('favoritableId', targetIds);
    const favoriteIds = new Set(
      favorites.map((favorite) => favorite.favoritableId),
    );

    for (const model of models) {
      model.$extras.isFavorite = favoriteIds.has(model.id);
    }

    return models;
  }

  private static async resourceExists(type: FavoritableType, targetId: number) {
    if (type === FAVORITABLE_TYPES.RESTAURANT) {
      return !!(await Restaurant.find(targetId));
    }

    return false;
  }
}
