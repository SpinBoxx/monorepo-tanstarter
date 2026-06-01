import type { HttpContext } from '@adonisjs/core/http';
import MenuItemVariant from '#models/menu_item_variant';
import {
  createMenuItemVariantValidator,
  listCatalogValidator,
  updateMenuItemVariantValidator,
} from '#validators/commerce/catalog.validator';

export default class MenuItemVariantsController {
  async index({ request }: HttpContext) {
    const filters = await request.validateUsing(listCatalogValidator);
    const query = MenuItemVariant.query()
      .preload('menuItem')
      .orderBy('displayOrder', 'asc');

    if (filters.restaurantId) {
      query.whereHas('menuItem', (item) =>
        item.where('restaurantId', filters.restaurantId!),
      );
    }

    if (filters.isAvailable !== undefined) {
      query.where('isAvailable', filters.isAvailable);
    }

    if (filters.search) {
      query.where((builder) => {
        builder
          .whereILike('name', `%${filters.search}%`)
          .orWhereILike('sku', `%${filters.search}%`);
      });
    }

    return query.paginate(filters.page ?? 1, filters.limit ?? 20);
  }

  async show({ params, response }: HttpContext) {
    const variant = await MenuItemVariant.query()
      .where('id', params.id)
      .preload('menuItem')
      .first();

    if (!variant) {
      return response.notFound({ message: 'Variant not found' });
    }

    return variant;
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createMenuItemVariantValidator);
    const variant = await MenuItemVariant.create(payload);

    return response.created(variant);
  }

  async update({ params, request, response }: HttpContext) {
    const variant = await MenuItemVariant.find(params.id);

    if (!variant) {
      return response.notFound({ message: 'Variant not found' });
    }

    const payload = await request.validateUsing(updateMenuItemVariantValidator);
    variant.merge(payload);
    await variant.save();

    return variant;
  }

  async destroy({ params, response }: HttpContext) {
    const variant = await MenuItemVariant.find(params.id);

    if (!variant) {
      return response.notFound({ message: 'Variant not found' });
    }

    await variant.delete();

    return { message: 'Variant deleted successfully' };
  }
}
