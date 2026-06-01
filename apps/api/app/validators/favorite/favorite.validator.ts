import vine from '@vinejs/vine';
import { FAVORITABLE_TYPES } from '#types/favorite';

export const listFavoritesValidator = vine.create({
  type: vine.enum(Object.values(FAVORITABLE_TYPES)),
  page: vine.number().positive().optional(),
  limit: vine.number().positive().optional(),
});

export const createFavoriteValidator = vine.create({
  type: vine.enum(Object.values(FAVORITABLE_TYPES)),
  targetId: vine.number().positive(),
});

export const deleteFavoriteValidator = vine.create({
  type: vine.enum(Object.values(FAVORITABLE_TYPES)),
  targetId: vine.number().positive(),
});
