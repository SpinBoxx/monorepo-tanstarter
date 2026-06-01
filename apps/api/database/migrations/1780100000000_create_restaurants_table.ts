import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'restaurants';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('name').notNullable();
      table.string('slug').notNullable().unique();
      table.text('description').nullable();
      table.string('image_url').nullable();
      table.string('phone').nullable();
      table.string('email').nullable();
      table.string('address_line1').notNullable();
      table.string('address_line2').nullable();
      table.string('city').notNullable();
      table.string('postal_code').notNullable();
      table.string('country', 2).notNullable().defaultTo('FR');
      table.decimal('latitude', 10, 7).nullable();
      table.decimal('longitude', 10, 7).nullable();
      table.text('opening_hours').nullable();
      table.integer('delivery_radius_meters').unsigned().nullable();
      table
        .integer('minimum_order_cents')
        .unsigned()
        .notNullable()
        .defaultTo(0);
      table.string('status').notNullable().defaultTo('draft');
      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').nullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
