import { BaseTransformer } from '@adonisjs/core/transformers';
import type MenuItem from '#models/menu_item';
import type MenuItemOption from '#models/menu_item_option';
import type MenuItemOptionGroup from '#models/menu_item_option_group';
import type MenuItemVariant from '#models/menu_item_variant';
import type ProductCategory from '#models/product_category';
import type Restaurant from '#models/restaurant';

export default class RestaurantTransformer extends BaseTransformer<Restaurant> {
  toObject() {
    return {
      id: this.resource.id,
      name: this.resource.name,
      slug: this.resource.slug,
      description: this.resource.description,
      imageUrl: this.resource.imageUrl,
      city: this.resource.city,
      status: this.resource.status,
      minimumOrderCents: this.resource.minimumOrderCents,
      isFavorite: this.resource.isFavorite,
      createdAt: this.resource.createdAt.toISO() ?? '',
      updatedAt: this.resource.updatedAt?.toISO() ?? null,
    };
  }

  forDetailedView() {
    return {
      ...this.toObject(),
      phone: this.resource.phone,
      email: this.resource.email,
      addressLine1: this.resource.addressLine1,
      addressLine2: this.resource.addressLine2,
      postalCode: this.resource.postalCode,
      country: this.resource.country,
      latitude: this.resource.latitude,
      longitude: this.resource.longitude,
      openingHours: this.resource.openingHours,
      deliveryRadiusMeters: this.resource.deliveryRadiusMeters,
      categories: (this.resource.categories ?? []).map((category) =>
        this.serializeCategory(category),
      ),
    };
  }

  private serializeCategory(category: ProductCategory) {
    return {
      id: category.id,
      restaurantId: category.restaurantId,
      name: category.name,
      slug: category.slug,
      description: category.description,
      displayOrder: category.displayOrder,
      isActive: category.isActive,
      createdAt: category.createdAt.toISO() ?? '',
      updatedAt: category.updatedAt?.toISO() ?? null,
      menuItems: (category.menuItems ?? []).map((item) =>
        this.serializeMenuItem(item),
      ),
    };
  }

  private serializeMenuItem(item: MenuItem) {
    return {
      id: item.id,
      restaurantId: item.restaurantId,
      categoryId: item.categoryId,
      name: item.name,
      slug: item.slug,
      description: item.description,
      type: item.type,
      imageUrl: item.imageUrl,
      basePriceCents: item.basePriceCents,
      taxRateBps: item.taxRateBps,
      calories: item.calories,
      isFeatured: item.isFeatured,
      isAvailable: item.isAvailable,
      displayOrder: item.displayOrder,
      createdAt: item.createdAt.toISO() ?? '',
      updatedAt: item.updatedAt?.toISO() ?? null,
      variants: (item.variants ?? []).map((variant) =>
        this.serializeVariant(variant),
      ),
      optionGroups: (item.optionGroups ?? []).map((group) =>
        this.serializeOptionGroup(group),
      ),
    };
  }

  private serializeVariant(variant: MenuItemVariant) {
    return {
      id: variant.id,
      menuItemId: variant.menuItemId,
      name: variant.name,
      sku: variant.sku,
      priceCents: variant.priceCents,
      calories: variant.calories,
      isDefault: variant.isDefault,
      isAvailable: variant.isAvailable,
      displayOrder: variant.displayOrder,
      createdAt: variant.createdAt.toISO() ?? '',
      updatedAt: variant.updatedAt?.toISO() ?? null,
    };
  }

  private serializeOptionGroup(group: MenuItemOptionGroup) {
    return {
      id: group.id,
      menuItemId: group.menuItemId,
      name: group.name,
      minSelected: group.minSelected,
      maxSelected: group.maxSelected,
      isRequired: group.isRequired,
      displayOrder: group.displayOrder,
      createdAt: group.createdAt.toISO() ?? '',
      updatedAt: group.updatedAt?.toISO() ?? null,
      options: (group.options ?? []).map((option) =>
        this.serializeOption(option),
      ),
    };
  }

  private serializeOption(option: MenuItemOption) {
    return {
      id: option.id,
      optionGroupId: option.optionGroupId,
      name: option.name,
      priceCents: option.priceCents,
      calories: option.calories,
      isAvailable: option.isAvailable,
      displayOrder: option.displayOrder,
      createdAt: option.createdAt.toISO() ?? '',
      updatedAt: option.updatedAt?.toISO() ?? null,
    };
  }
}
