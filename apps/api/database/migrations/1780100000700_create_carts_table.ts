import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'carts';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
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
      table.string('session_id').nullable().unique();
      table.string('status').notNullable().defaultTo('active');
      table.string('currency', 3).notNullable().defaultTo('EUR');
      table.integer('subtotal_cents').unsigned().notNullable().defaultTo(0);
      table.integer('total_cents').unsigned().notNullable().defaultTo(0);
      table.timestamp('expires_at').nullable();
      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').nullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
