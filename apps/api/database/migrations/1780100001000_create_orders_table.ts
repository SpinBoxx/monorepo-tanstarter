import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'orders';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('order_number').notNullable().unique();
      table
        .integer('user_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('users')
        .onDelete('SET NULL');
      table
        .integer('restaurant_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('restaurants')
        .onDelete('CASCADE');
      table
        .integer('customer_address_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('customer_addresses')
        .onDelete('SET NULL');
      table.string('status').notNullable().defaultTo('pending');
      table.string('fulfillment_method').notNullable().defaultTo('delivery');
      table.string('customer_name').notNullable();
      table.string('customer_email').notNullable();
      table.string('customer_phone').notNullable();
      table.string('currency', 3).notNullable().defaultTo('EUR');
      table.integer('subtotal_cents').unsigned().notNullable().defaultTo(0);
      table.integer('delivery_fee_cents').unsigned().notNullable().defaultTo(0);
      table.integer('discount_cents').unsigned().notNullable().defaultTo(0);
      table.integer('tax_cents').unsigned().notNullable().defaultTo(0);
      table.integer('total_cents').unsigned().notNullable().defaultTo(0);
      table.text('notes').nullable();
      table.timestamp('scheduled_for').nullable();
      table.timestamp('placed_at').nullable();
      table.timestamp('accepted_at').nullable();
      table.timestamp('ready_at').nullable();
      table.timestamp('delivered_at').nullable();
      table.timestamp('cancelled_at').nullable();
      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').nullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
