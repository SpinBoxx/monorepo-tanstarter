import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'order_item_options';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table
        .integer('order_item_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('order_items')
        .onDelete('CASCADE');
      table
        .integer('menu_item_option_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('menu_item_options')
        .onDelete('SET NULL');
      table.string('name').notNullable();
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
