import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'cart_items';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table
        .integer('cart_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('carts')
        .onDelete('CASCADE');
      table
        .integer('menu_item_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('menu_items')
        .onDelete('CASCADE');
      table
        .integer('variant_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('menu_item_variants')
        .onDelete('SET NULL');
      table.integer('quantity').unsigned().notNullable().defaultTo(1);
      table.integer('unit_price_cents').unsigned().notNullable();
      table.integer('total_price_cents').unsigned().notNullable();
      table.text('notes').nullable();
      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').nullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
