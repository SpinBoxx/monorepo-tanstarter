import type { HttpContext } from '@adonisjs/core/http';
import MenuItemOption from '#models/menu_item_option';
import {
  createMenuItemOptionValidator,
  listCatalogValidator,
  updateMenuItemOptionValidator,
} from '#validators/commerce/catalog.validator';

export default class MenuItemOptionsController {
  async index({ request }: HttpContext) {
    const filters = await request.validateUsing(listCatalogValidator);
    const query = MenuItemOption.query()
      .preload('optionGroup')
      .orderBy('displayOrder', 'asc');

    if (filters.isAvailable !== undefined) {
      query.where('isAvailable', filters.isAvailable);
    }

    if (filters.search) {
      query.whereILike('name', `%${filters.search}%`);
    }

    return query.paginate(filters.page ?? 1, filters.limit ?? 20);
  }

  async show({ params, response }: HttpContext) {
    const option = await MenuItemOption.query()
      .where('id', params.id)
      .preload('optionGroup')
      .first();

    if (!option) {
      return response.notFound({ message: 'Option not found' });
    }

    return option;
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createMenuItemOptionValidator);
    const option = await MenuItemOption.create(payload);

    return response.created(option);
  }

  async update({ params, request, response }: HttpContext) {
    const option = await MenuItemOption.find(params.id);

    if (!option) {
      return response.notFound({ message: 'Option not found' });
    }

    const payload = await request.validateUsing(updateMenuItemOptionValidator);
    option.merge(payload);
    await option.save();

    return option;
  }

  async destroy({ params, response }: HttpContext) {
    const option = await MenuItemOption.find(params.id);

    if (!option) {
      return response.notFound({ message: 'Option not found' });
    }

    await option.delete();

    return { message: 'Option deleted successfully' };
  }
}
