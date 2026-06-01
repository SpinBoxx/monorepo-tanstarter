import type { HttpContext } from '@adonisjs/core/http';
import MenuItem from '#models/menu_item';
import {
  createMenuItemValidator,
  listCatalogValidator,
  updateMenuItemValidator,
} from '#validators/commerce/catalog.validator';

export default class MenuItemsController {
  async index({ request }: HttpContext) {
    const filters = await request.validateUsing(listCatalogValidator);
    const query = MenuItem.query()
      .preload('restaurant')
      .preload('category')
      .preload('variants', (variants) =>
        variants.orderBy('displayOrder', 'asc'),
      )
      .orderBy('displayOrder', 'asc');

    if (filters.restaurantId) {
      query.where('restaurantId', filters.restaurantId);
    }

    if (filters.categoryId) {
      query.where('categoryId', filters.categoryId);
    }

    if (filters.type) {
      query.where('type', filters.type);
    }

    if (filters.isAvailable !== undefined) {
      query.where('isAvailable', filters.isAvailable);
    }

    if (filters.search) {
      query.where((builder) => {
        builder
          .whereILike('name', `%${filters.search}%`)
          .orWhereILike('slug', `%${filters.search}%`)
          .orWhereILike('description', `%${filters.search}%`);
      });
    }

    return query.paginate(filters.page ?? 1, filters.limit ?? 20);
  }

  async show({ params, response }: HttpContext) {
    const item = await MenuItem.query()
      .where('id', params.id)
      .preload('restaurant')
      .preload('category')
      .preload('variants', (variants) =>
        variants.orderBy('displayOrder', 'asc'),
      )
      .preload('optionGroups', (groups) =>
        groups
          .orderBy('displayOrder', 'asc')
          .preload('options', (options) =>
            options.orderBy('displayOrder', 'asc'),
          ),
      )
      .first();

    if (!item) {
      return response.notFound({ message: 'Menu item not found' });
    }

    return item;
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createMenuItemValidator);
    const item = await MenuItem.create(payload);

    return response.created(item);
  }

  async update({ params, request, response }: HttpContext) {
    const item = await MenuItem.find(params.id);

    if (!item) {
      return response.notFound({ message: 'Menu item not found' });
    }

    const payload = await request.validateUsing(updateMenuItemValidator);
    item.merge(payload);
    await item.save();

    return item;
  }

  async destroy({ params, response }: HttpContext) {
    const item = await MenuItem.find(params.id);

    if (!item) {
      return response.notFound({ message: 'Menu item not found' });
    }

    await item.delete();

    return { message: 'Menu item deleted successfully' };
  }
}
