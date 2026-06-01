import type { HttpContext } from '@adonisjs/core/http';
import MenuItemOptionGroup from '#models/menu_item_option_group';
import {
  createMenuItemOptionGroupValidator,
  listCatalogValidator,
  updateMenuItemOptionGroupValidator,
} from '#validators/commerce/catalog.validator';

export default class MenuItemOptionGroupsController {
  async index({ request }: HttpContext) {
    const filters = await request.validateUsing(listCatalogValidator);
    const query = MenuItemOptionGroup.query()
      .preload('menuItem')
      .preload('options', (options) => options.orderBy('displayOrder', 'asc'))
      .orderBy('displayOrder', 'asc');

    if (filters.restaurantId) {
      query.whereHas('menuItem', (item) =>
        item.where('restaurantId', filters.restaurantId!),
      );
    }

    if (filters.search) {
      query.whereILike('name', `%${filters.search}%`);
    }

    return query.paginate(filters.page ?? 1, filters.limit ?? 20);
  }

  async show({ params, response }: HttpContext) {
    const group = await MenuItemOptionGroup.query()
      .where('id', params.id)
      .preload('menuItem')
      .preload('options', (options) => options.orderBy('displayOrder', 'asc'))
      .first();

    if (!group) {
      return response.notFound({ message: 'Option group not found' });
    }

    return group;
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(
      createMenuItemOptionGroupValidator,
    );
    const group = await MenuItemOptionGroup.create(payload);

    return response.created(group);
  }

  async update({ params, request, response }: HttpContext) {
    const group = await MenuItemOptionGroup.find(params.id);

    if (!group) {
      return response.notFound({ message: 'Option group not found' });
    }

    const payload = await request.validateUsing(
      updateMenuItemOptionGroupValidator,
    );
    group.merge(payload);
    await group.save();

    return group;
  }

  async destroy({ params, response }: HttpContext) {
    const group = await MenuItemOptionGroup.find(params.id);

    if (!group) {
      return response.notFound({ message: 'Option group not found' });
    }

    await group.delete();

    return { message: 'Option group deleted successfully' };
  }
}
