import type { SchemaRules } from '@adonisjs/lucid/types/schema_generator';

export default {
  tables: {
    customer_addresses: {
      columns: {
        line1: {
          tsType: 'string',
          decorators: [{ name: '@column', args: { columnName: 'line1' } }],
        },
        line2: {
          tsType: 'string',
          decorators: [{ name: '@column', args: { columnName: 'line2' } }],
        },
      },
    },
    restaurants: {
      columns: {
        address_line1: {
          tsType: 'string',
          decorators: [
            { name: '@column', args: { columnName: 'address_line1' } },
          ],
        },
        address_line2: {
          tsType: 'string',
          decorators: [
            { name: '@column', args: { columnName: 'address_line2' } },
          ],
        },
      },
    },
  },
} satisfies SchemaRules;
