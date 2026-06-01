import { belongsTo, hasMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import { MenuItemOptionSchema } from '#database/schema';
import CartItemOption from './cart_item_option.ts';
import MenuItemOptionGroup from './menu_item_option_group.ts';
import OrderItemOption from './order_item_option.ts';

export default class MenuItemOption extends MenuItemOptionSchema {
  @belongsTo(() => MenuItemOptionGroup, {
    foreignKey: 'optionGroupId',
  })
  declare optionGroup: BelongsTo<typeof MenuItemOptionGroup>;

  @hasMany(() => CartItemOption)
  declare cartItemOptions: HasMany<typeof CartItemOption>;

  @hasMany(() => OrderItemOption)
  declare orderItemOptions: HasMany<typeof OrderItemOption>;
}
