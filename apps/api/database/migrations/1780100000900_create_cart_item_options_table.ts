import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'cart_item_options';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table
        .integer('cart_item_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('cart_items')
        .onDelete('CASCADE');
      table
        .integer('menu_item_option_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('menu_item_options')
        .onDelete('CASCADE');
      table.integer('quantity').unsigned().notNullable().defaultTo(1);
      table.integer('unit_price_cents').unsigned().notNullable().defaultTo(0);
      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').nullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
