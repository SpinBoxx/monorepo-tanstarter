import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'menu_items';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table
        .integer('restaurant_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('restaurants')
        .onDelete('CASCADE');
      table
        .integer('category_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('product_categories')
        .onDelete('SET NULL');
      table.string('name').notNullable();
      table.string('slug').notNullable();
      table.text('description').nullable();
      table.string('type').notNullable().defaultTo('product');
      table.string('image_url').nullable();
      table.integer('base_price_cents').unsigned().notNullable().defaultTo(0);
      table.integer('tax_rate_bps').unsigned().notNullable().defaultTo(1000);
      table.integer('calories').unsigned().nullable();
      table.boolean('is_featured').notNullable().defaultTo(false);
      table.boolean('is_available').notNullable().defaultTo(true);
      table.integer('display_order').notNullable().defaultTo(0);
      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').nullable();

      table.unique(['restaurant_id', 'slug']);
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
