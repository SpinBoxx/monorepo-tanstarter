import { belongsTo, hasMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import { MenuItemSchema } from '#database/schema';
import type { MenuItemType } from '../types/commerce.ts';
import CartItem from './cart_item.ts';
import MenuItemOptionGroup from './menu_item_option_group.ts';
import MenuItemVariant from './menu_item_variant.ts';
import OrderItem from './order_item.ts';
import ProductCategory from './product_category.ts';
import Restaurant from './restaurant.ts';

export default class MenuItem extends MenuItemSchema {
  declare type: MenuItemType;

  @belongsTo(() => Restaurant)
  declare restaurant: BelongsTo<typeof Restaurant>;

  @belongsTo(() => ProductCategory, {
    foreignKey: 'categoryId',
  })
  declare category: BelongsTo<typeof ProductCategory>;

  @hasMany(() => MenuItemVariant)
  declare variants: HasMany<typeof MenuItemVariant>;

  @hasMany(() => MenuItemOptionGroup)
  declare optionGroups: HasMany<typeof MenuItemOptionGroup>;

  @hasMany(() => CartItem)
  declare cartItems: HasMany<typeof CartItem>;

  @hasMany(() => OrderItem)
  declare orderItems: HasMany<typeof OrderItem>;
}
