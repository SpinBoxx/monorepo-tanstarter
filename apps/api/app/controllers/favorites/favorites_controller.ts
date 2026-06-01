import type { HttpContext } from '@adonisjs/core/http';
import FavoriteService from '#services/favorite_service';
import FavoriteTransformer from '#transformers/favorite-transformer';
import {
  createFavoriteValidator,
  deleteFavoriteValidator,
  listFavoritesValidator,
} from '#validators/favorite/favorite.validator';

export default class FavoritesController {
  async index({ auth, request, serialize }: HttpContext) {
    const payload = await request.validateUsing(listFavoritesValidator);
    const user = auth.getUserOrFail();
    const favorites = await FavoriteService.list(user, payload.type, {
      page: payload.page,
      limit: payload.limit,
    });

    return serialize(
      FavoriteTransformer.paginate(favorites.rows, favorites.meta),
    );
  }

  async store({ auth, request, response, serialize }: HttpContext) {
    const payload = await request.validateUsing(createFavoriteValidator);
    const user = auth.getUserOrFail();
    const favorite = await FavoriteService.add(
      user,
      payload.type,
      payload.targetId,
    );

    if (!favorite) {
      return response.notFound({ message: 'Favoritable resource not found' });
    }

    return serialize(favorite);
  }

  async destroy({ auth, request, response, serialize }: HttpContext) {
    const payload = await request.validateUsing(deleteFavoriteValidator);
    const user = auth.getUserOrFail();
    const favorite = await FavoriteService.remove(
      user,
      payload.type,
      payload.targetId,
    );

    if (!favorite) {
      return response.notFound({ message: 'Favoritable resource not found' });
    }

    return serialize(favorite);
  }
}
