import { belongsTo, hasMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import { MenuItemOptionGroupSchema } from '#database/schema';
import MenuItem from './menu_item.ts';
import MenuItemOption from './menu_item_option.ts';

export default class MenuItemOptionGroup extends MenuItemOptionGroupSchema {
  @belongsTo(() => MenuItem)
  declare menuItem: BelongsTo<typeof MenuItem>;

  @hasMany(() => MenuItemOption, {
    foreignKey: 'optionGroupId',
  })
  declare options: HasMany<typeof MenuItemOption>;
}
