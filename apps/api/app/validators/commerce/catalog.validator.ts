import vine from '@vinejs/vine';
import { MENU_ITEM_TYPES, RESTAURANT_STATUSES } from '../../types/commerce.ts';

export const listCatalogValidator = vine.create({
  page: vine.number().positive().optional(),
  limit: vine.number().positive().optional(),
  search: vine.string().trim().optional(),
  restaurantId: vine.number().positive().optional(),
  categoryId: vine.number().positive().optional(),
  type: vine.enum(Object.values(MENU_ITEM_TYPES)).optional(),
  status: vine.enum(Object.values(RESTAURANT_STATUSES)).optional(),
  isAvailable: vine.boolean().optional(),
  isActive: vine.boolean().optional(),
});

export const createRestaurantValidator = vine.create({
  name: vine.string().trim().minLength(2),
  slug: vine.string().trim().minLength(2),
  description: vine.string().trim().nullable().optional(),
  imageUrl: vine.string().trim().url().nullable().optional(),
  phone: vine.string().trim().nullable().optional(),
  email: vine.string().trim().email().nullable().optional(),
  addressLine1: vine.string().trim(),
  addressLine2: vine.string().trim().nullable().optional(),
  city: vine.string().trim(),
  postalCode: vine.string().trim(),
  country: vine.string().trim().fixedLength(2).optional(),
  latitude: vine.number().nullable().optional(),
  longitude: vine.number().nullable().optional(),
  openingHours: vine.string().trim().nullable().optional(),
  deliveryRadiusMeters: vine.number().positive().nullable().optional(),
  minimumOrderCents: vine.number().min(0).optional(),
  status: vine.enum(Object.values(RESTAURANT_STATUSES)).optional(),
});

export const updateRestaurantValidator = vine.create({
  name: vine.string().trim().minLength(2).optional(),
  slug: vine.string().trim().minLength(2).optional(),
  description: vine.string().trim().nullable().optional(),
  imageUrl: vine.string().trim().url().nullable().optional(),
  phone: vine.string().trim().nullable().optional(),
  email: vine.string().trim().email().nullable().optional(),
  addressLine1: vine.string().trim().optional(),
  addressLine2: vine.string().trim().nullable().optional(),
  city: vine.string().trim().optional(),
  postalCode: vine.string().trim().optional(),
  country: vine.string().trim().fixedLength(2).optional(),
  latitude: vine.number().nullable().optional(),
  longitude: vine.number().nullable().optional(),
  openingHours: vine.string().trim().nullable().optional(),
  deliveryRadiusMeters: vine.number().positive().nullable().optional(),
  minimumOrderCents: vine.number().min(0).optional(),
  status: vine.enum(Object.values(RESTAURANT_STATUSES)).optional(),
});

export const createProductCategoryValidator = vine.create({
  restaurantId: vine.number().positive(),
  name: vine.string().trim().minLength(2),
  slug: vine.string().trim().minLength(2),
  description: vine.string().trim().nullable().optional(),
  displayOrder: vine.number().optional(),
  isActive: vine.boolean().optional(),
});

export const updateProductCategoryValidator = vine.create({
  restaurantId: vine.number().positive().optional(),
  name: vine.string().trim().minLength(2).optional(),
  slug: vine.string().trim().minLength(2).optional(),
  description: vine.string().trim().nullable().optional(),
  displayOrder: vine.number().optional(),
  isActive: vine.boolean().optional(),
});

export const createMenuItemValidator = vine.create({
  restaurantId: vine.number().positive(),
  categoryId: vine.number().positive().nullable().optional(),
  name: vine.string().trim().minLength(2),
  slug: vine.string().trim().minLength(2),
  description: vine.string().trim().nullable().optional(),
  type: vine.enum(Object.values(MENU_ITEM_TYPES)).optional(),
  imageUrl: vine.string().trim().url().nullable().optional(),
  basePriceCents: vine.number().min(0),
  taxRateBps: vine.number().min(0).optional(),
  calories: vine.number().min(0).nullable().optional(),
  isFeatured: vine.boolean().optional(),
  isAvailable: vine.boolean().optional(),
  displayOrder: vine.number().optional(),
});

export const updateMenuItemValidator = vine.create({
  restaurantId: vine.number().positive().optional(),
  categoryId: vine.number().positive().nullable().optional(),
  name: vine.string().trim().minLength(2).optional(),
  slug: vine.string().trim().minLength(2).optional(),
  description: vine.string().trim().nullable().optional(),
  type: vine.enum(Object.values(MENU_ITEM_TYPES)).optional(),
  imageUrl: vine.string().trim().url().nullable().optional(),
  basePriceCents: vine.number().min(0).optional(),
  taxRateBps: vine.number().min(0).optional(),
  calories: vine.number().min(0).nullable().optional(),
  isFeatured: vine.boolean().optional(),
  isAvailable: vine.boolean().optional(),
  displayOrder: vine.number().optional(),
});

export const createMenuItemVariantValidator = vine.create({
  menuItemId: vine.number().positive(),
  name: vine.string().trim().minLength(1),
  sku: vine.string().trim().nullable().optional(),
  priceCents: vine.number().min(0),
  calories: vine.number().min(0).nullable().optional(),
  isDefault: vine.boolean().optional(),
  isAvailable: vine.boolean().optional(),
  displayOrder: vine.number().optional(),
});

export const updateMenuItemVariantValidator = vine.create({
  menuItemId: vine.number().positive().optional(),
  name: vine.string().trim().minLength(1).optional(),
  sku: vine.string().trim().nullable().optional(),
  priceCents: vine.number().min(0).optional(),
  calories: vine.number().min(0).nullable().optional(),
  isDefault: vine.boolean().optional(),
  isAvailable: vine.boolean().optional(),
  displayOrder: vine.number().optional(),
});

export const createMenuItemOptionGroupValidator = vine.create({
  menuItemId: vine.number().positive(),
  name: vine.string().trim().minLength(2),
  minSelected: vine.number().min(0).optional(),
  maxSelected: vine.number().min(0).optional(),
  isRequired: vine.boolean().optional(),
  displayOrder: vine.number().optional(),
});

export const updateMenuItemOptionGroupValidator = vine.create({
  menuItemId: vine.number().positive().optional(),
  name: vine.string().trim().minLength(2).optional(),
  minSelected: vine.number().min(0).optional(),
  maxSelected: vine.number().min(0).optional(),
  isRequired: vine.boolean().optional(),
  displayOrder: vine.number().optional(),
});

export const createMenuItemOptionValidator = vine.create({
  optionGroupId: vine.number().positive(),
  name: vine.string().trim().minLength(1),
  priceCents: vine.number().min(0).optional(),
  calories: vine.number().min(0).nullable().optional(),
  isAvailable: vine.boolean().optional(),
  displayOrder: vine.number().optional(),
});

export const updateMenuItemOptionValidator = vine.create({
  optionGroupId: vine.number().positive().optional(),
  name: vine.string().trim().minLength(1).optional(),
  priceCents: vine.number().min(0).optional(),
  calories: vine.number().min(0).nullable().optional(),
  isAvailable: vine.boolean().optional(),
  displayOrder: vine.number().optional(),
});
