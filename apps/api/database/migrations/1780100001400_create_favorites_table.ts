import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'favorites';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
      table.string('favoritable_type').notNullable();
      table.integer('favoritable_id').unsigned().notNullable();
      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').nullable();

      table.unique(['user_id', 'favoritable_type', 'favoritable_id']);
      table.index(['favoritable_type', 'favoritable_id']);
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
