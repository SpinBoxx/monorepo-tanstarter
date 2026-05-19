import vine from '@vinejs/vine';
import { USER_ROLES } from '../../types/role.ts';

export const updateUserValidator = vine.create({
  fullName: vine.string().nullable(),
  email: vine
    .string()
    .email()
    .unique({ table: 'users', column: 'email' })
    .optional(),
  role: vine.enum(Object.values(USER_ROLES)).optional(),
});
