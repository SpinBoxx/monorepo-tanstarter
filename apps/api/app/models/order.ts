import { belongsTo, hasMany, hasOne } from '@adonisjs/lucid/orm';
import type {
  BelongsTo,
  HasMany,
  HasOne,
} from '@adonisjs/lucid/types/relations';
import { OrderSchema } from '#database/schema';
import type { FulfillmentMethod, OrderStatus } from '../types/commerce.ts';
import CustomerAddress from './customer_address.ts';
import OrderItem from './order_item.ts';
import Payment from './payment.ts';
import Restaurant from './restaurant.ts';
import User from './user.ts';

export default class Order extends OrderSchema {
  declare status: OrderStatus;
  declare fulfillmentMethod: FulfillmentMethod;

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>;

  @belongsTo(() => Restaurant)
  declare restaurant: BelongsTo<typeof Restaurant>;

  @belongsTo(() => CustomerAddress)
  declare customerAddress: BelongsTo<typeof CustomerAddress>;

  @hasMany(() => OrderItem)
  declare items: HasMany<typeof OrderItem>;

  @hasOne(() => Payment)
  declare payment: HasOne<typeof Payment>;
}
