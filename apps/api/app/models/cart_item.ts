import { belongsTo, hasMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import { CartItemSchema } from '#database/schema';
import Cart from './cart.ts';
import CartItemOption from './cart_item_option.ts';
import MenuItem from './menu_item.ts';
import MenuItemVariant from './menu_item_variant.ts';

export default class CartItem extends CartItemSchema {
  @belongsTo(() => Cart)
  declare cart: BelongsTo<typeof Cart>;

  @belongsTo(() => MenuItem)
  declare menuItem: BelongsTo<typeof MenuItem>;

  @belongsTo(() => MenuItemVariant, {
    foreignKey: 'variantId',
  })
  declare variant: BelongsTo<typeof MenuItemVariant>;

  @hasMany(() => CartItemOption)
  declare options: HasMany<typeof CartItemOption>;
}
