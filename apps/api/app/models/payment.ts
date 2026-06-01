import { belongsTo } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import { PaymentSchema } from '#database/schema';
import type { PaymentProvider, PaymentStatus } from '../types/commerce.ts';
import Order from './order.ts';

export default class Payment extends PaymentSchema {
  declare provider: PaymentProvider;
  declare status: PaymentStatus;

  @belongsTo(() => Order)
  declare order: BelongsTo<typeof Order>;
}
