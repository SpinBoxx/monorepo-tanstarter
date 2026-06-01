import type { HttpContext } from '@adonisjs/core/http';
import ProductCategory from '#models/product_category';
import {
  createProductCategoryValidator,
  listCatalogValidator,
  updateProductCategoryValidator,
} from '#validators/commerce/catalog.validator';

export default class ProductCategoriesController {
  async index({ request }: HttpContext) {
    const filters = await request.validateUsing(listCatalogValidator);
    const query = ProductCategory.query()
      .preload('restaurant')
      .orderBy('displayOrder', 'asc');

    if (filters.restaurantId) {
      query.where('restaurantId', filters.restaurantId);
    }

    if (filters.isActive !== undefined) {
      query.where('isActive', filters.isActive);
    }

    if (filters.search) {
      query.where((builder) => {
        builder
          .whereILike('name', `%${filters.search}%`)
          .orWhereILike('slug', `%${filters.search}%`);
      });
    }

    return query.paginate(filters.page ?? 1, filters.limit ?? 20);
  }

  async show({ params, response }: HttpContext) {
    const category = await ProductCategory.query()
      .where('id', params.id)
      .preload('restaurant')
      .preload('menuItems', (items) =>
        items
          .orderBy('displayOrder', 'asc')
          .preload('variants', (variants) =>
            variants.orderBy('displayOrder', 'asc'),
          )
          .preload('optionGroups', (groups) =>
            groups
              .orderBy('displayOrder', 'asc')
              .preload('options', (options) =>
                options.orderBy('displayOrder', 'asc'),
              ),
          ),
      )
      .first();

    if (!category) {
      return response.notFound({ message: 'Category not found' });
    }

    return category;
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createProductCategoryValidator);
    const category = await ProductCategory.create(payload);

    return response.created(category);
  }

  async update({ params, request, response }: HttpContext) {
    const category = await ProductCategory.find(params.id);

    if (!category) {
      return response.notFound({ message: 'Category not found' });
    }

    const payload = await request.validateUsing(updateProductCategoryValidator);
    category.merge(payload);
    await category.save();

    return category;
  }

  async destroy({ params, response }: HttpContext) {
    const category = await ProductCategory.find(params.id);

    if (!category) {
      return response.notFound({ message: 'Category not found' });
    }

    await category.delete();

    return { message: 'Category deleted successfully' };
  }
}
