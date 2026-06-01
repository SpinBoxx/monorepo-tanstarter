import { belongsTo, hasMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import { OrderItemSchema } from '#database/schema';
import MenuItem from './menu_item.ts';
import MenuItemVariant from './menu_item_variant.ts';
import Order from './order.ts';
import OrderItemOption from './order_item_option.ts';

export default class OrderItem extends OrderItemSchema {
  @belongsTo(() => Order)
  declare order: BelongsTo<typeof Order>;

  @belongsTo(() => MenuItem)
  declare menuItem: BelongsTo<typeof MenuItem>;

  @belongsTo(() => MenuItemVariant, {
    foreignKey: 'variantId',
  })
  declare variant: BelongsTo<typeof MenuItemVariant>;

  @hasMany(() => OrderItemOption)
  declare options: HasMany<typeof OrderItemOption>;
}
