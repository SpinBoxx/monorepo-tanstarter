import { belongsTo, hasMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import { CustomerAddressSchema } from '#database/schema';
import Order from './order.ts';
import User from './user.ts';

export default class CustomerAddress extends CustomerAddressSchema {
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>;

  @hasMany(() => Order)
  declare orders: HasMany<typeof Order>;
}
