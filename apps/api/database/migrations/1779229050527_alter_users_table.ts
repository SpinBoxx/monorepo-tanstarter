import { BaseSchema } from '@adonisjs/lucid/schema';
import { DEFAULT_USER_ROLE, USER_ROLES } from '../../app/types/role.ts';

export default class extends BaseSchema {
  protected tableName = 'users';

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .enum('role', Object.values(USER_ROLES))
        .notNullable()
        .defaultTo(DEFAULT_USER_ROLE);
    });
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('role');
    });
  }
}
