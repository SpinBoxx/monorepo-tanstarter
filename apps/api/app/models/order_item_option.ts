import { belongsTo } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import { OrderItemOptionSchema } from '#database/schema';
import MenuItemOption from './menu_item_option.ts';
import OrderItem from './order_item.ts';

export default class OrderItemOption extends OrderItemOptionSchema {
  @belongsTo(() => OrderItem)
  declare orderItem: BelongsTo<typeof OrderItem>;

  @belongsTo(() => MenuItemOption)
  declare menuItemOption: BelongsTo<typeof MenuItemOption>;
}
