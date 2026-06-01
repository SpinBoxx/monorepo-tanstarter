import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'payments';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table
        .integer('order_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('orders')
        .onDelete('CASCADE');
      table.string('provider').notNullable();
      table.string('provider_reference').nullable();
      table.string('status').notNullable().defaultTo('pending');
      table.integer('amount_cents').unsigned().notNullable();
      table.string('currency', 3).notNullable().defaultTo('EUR');
      table.timestamp('paid_at').nullable();
      table.timestamp('refunded_at').nullable();
      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').nullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
