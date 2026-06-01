import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'product_categories';

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
      table.string('name').notNullable();
      table.string('slug').notNullable();
      table.text('description').nullable();
      table.integer('display_order').notNullable().defaultTo(0);
      table.boolean('is_active').notNullable().defaultTo(true);
      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').nullable();

      table.unique(['restaurant_id', 'slug']);
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
