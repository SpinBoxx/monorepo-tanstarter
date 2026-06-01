import { BaseTransformer } from '@adonisjs/core/transformers';
import type Favorite from '#models/favorite';

export default class FavoriteTransformer extends BaseTransformer<Favorite> {
  toObject() {
    return {
      id: this.resource.id,
      type: this.resource.favoritableType,
      targetId: this.resource.favoritableId,
      isFavorite: true,
      createdAt: this.resource.createdAt.toISO() ?? '',
      updatedAt: this.resource.updatedAt?.toISO() ?? null,
    };
  }
}
