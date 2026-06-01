import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'menu_item_variants';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table
        .integer('menu_item_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('menu_items')
        .onDelete('CASCADE');
      table.string('name').notNullable();
      table.string('sku').nullable();
      table.integer('price_cents').unsigned().notNullable();
      table.integer('calories').unsigned().nullable();
      table.boolean('is_default').notNullable().defaultTo(false);
      table.boolean('is_available').notNullable().defaultTo(true);
      table.integer('display_order').notNullable().defaultTo(0);
      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').nullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
