import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'customer_addresses';

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
      table.string('label').nullable();
      table.string('recipient_name').notNullable();
      table.string('phone').notNullable();
      table.string('line1').notNullable();
      table.string('line2').nullable();
      table.string('city').notNullable();
      table.string('postal_code').notNullable();
      table.string('country', 2).notNullable().defaultTo('FR');
      table.text('delivery_instructions').nullable();
      table.decimal('latitude', 10, 7).nullable();
      table.decimal('longitude', 10, 7).nullable();
      table.boolean('is_default').notNullable().defaultTo(false);
      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').nullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
