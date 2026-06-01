export const FAVORITABLE_TYPES = {
  RESTAURANT: 'restaurant',
} as const;

export type FavoritableType =
  (typeof FAVORITABLE_TYPES)[keyof typeof FAVORITABLE_TYPES];
