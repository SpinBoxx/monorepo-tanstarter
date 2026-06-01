import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'order_items';

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
      table
        .integer('menu_item_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('menu_items')
        .onDelete('SET NULL');
      table
        .integer('variant_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('menu_item_variants')
        .onDelete('SET NULL');
      table.string('name').notNullable();
      table.string('variant_name').nullable();
      table.integer('quantity').unsigned().notNullable();
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
