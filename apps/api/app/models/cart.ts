import { belongsTo, hasMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import { CartSchema } from '#database/schema';
import type { CartStatus } from '../types/commerce.ts';
import CartItem from './cart_item.ts';
import Restaurant from './restaurant.ts';
import User from './user.ts';

export default class Cart extends CartSchema {
  declare status: CartStatus;

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>;

  @belongsTo(() => Restaurant)
  declare restaurant: BelongsTo<typeof Restaurant>;

  @hasMany(() => CartItem)
  declare items: HasMany<typeof CartItem>;
}
