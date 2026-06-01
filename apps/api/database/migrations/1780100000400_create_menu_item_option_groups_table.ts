import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'menu_item_option_groups';

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
      table.integer('min_selected').unsigned().notNullable().defaultTo(0);
      table.integer('max_selected').unsigned().notNullable().defaultTo(1);
      table.boolean('is_required').notNullable().defaultTo(false);
      table.integer('display_order').notNullable().defaultTo(0);
      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').nullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
