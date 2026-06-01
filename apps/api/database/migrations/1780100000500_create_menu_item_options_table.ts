import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'menu_item_options';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table
        .integer('option_group_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('menu_item_option_groups')
        .onDelete('CASCADE');
      table.string('name').notNullable();
      table.integer('price_cents').unsigned().notNullable().defaultTo(0);
      table.integer('calories').unsigned().nullable();
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
