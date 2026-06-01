import { computed, hasMany } from '@adonisjs/lucid/orm';
import type { HasMany } from '@adonisjs/lucid/types/relations';
import { RestaurantSchema } from '#database/schema';
import { FAVORITABLE_TYPES } from '#types/favorite';
import type { RestaurantStatus } from '../types/commerce.ts';
import Cart from './cart.ts';
import Favorite from './favorite.ts';
import MenuItem from './menu_item.ts';
import Order from './order.ts';
import ProductCategory from './product_category.ts';

export default class Restaurant extends RestaurantSchema {
  declare status: RestaurantStatus;

  @hasMany(() => ProductCategory)
  declare categories: HasMany<typeof ProductCategory>;

  @hasMany(() => MenuItem)
  declare menuItems: HasMany<typeof MenuItem>;

  @hasMany(() => Cart)
  declare carts: HasMany<typeof Cart>;

  @hasMany(() => Order)
  declare orders: HasMany<typeof Order>;

  @hasMany(() => Favorite, {
    foreignKey: 'favoritableId',
    onQuery: (query) =>
      query.where('favoritableType', FAVORITABLE_TYPES.RESTAURANT),
  })
  declare favorites: HasMany<typeof Favorite>;

  @computed()
  get isFavorite() {
    return Number(this.$extras.isFavorite ?? 0) > 0;
  }
}
