import { belongsTo } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import { CartItemOptionSchema } from '#database/schema';
import CartItem from './cart_item.ts';
import MenuItemOption from './menu_item_option.ts';

export default class CartItemOption extends CartItemOptionSchema {
  @belongsTo(() => CartItem)
  declare cartItem: BelongsTo<typeof CartItem>;

  @belongsTo(() => MenuItemOption)
  declare menuItemOption: BelongsTo<typeof MenuItemOption>;
}
