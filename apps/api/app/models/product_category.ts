import { belongsTo, hasMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import { ProductCategorySchema } from '#database/schema';
import MenuItem from './menu_item.ts';
import Restaurant from './restaurant.ts';

export default class ProductCategory extends ProductCategorySchema {
  @belongsTo(() => Restaurant)
  declare restaurant: BelongsTo<typeof Restaurant>;

  @hasMany(() => MenuItem, {
    foreignKey: 'categoryId',
  })
  declare menuItems: HasMany<typeof MenuItem>;
}
