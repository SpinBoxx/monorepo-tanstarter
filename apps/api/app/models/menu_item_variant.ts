import { belongsTo, hasMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import { MenuItemVariantSchema } from '#database/schema';
import CartItem from './cart_item.ts';
import MenuItem from './menu_item.ts';
import OrderItem from './order_item.ts';

export default class MenuItemVariant extends MenuItemVariantSchema {
  @belongsTo(() => MenuItem)
  declare menuItem: BelongsTo<typeof MenuItem>;

  @hasMany(() => CartItem, {
    foreignKey: 'variantId',
  })
  declare cartItems: HasMany<typeof CartItem>;

  @hasMany(() => OrderItem, {
    foreignKey: 'variantId',
  })
  declare orderItems: HasMany<typeof OrderItem>;
}
