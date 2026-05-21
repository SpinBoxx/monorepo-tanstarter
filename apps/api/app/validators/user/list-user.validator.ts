import vine from '@vinejs/vine';

export const listUserValidator = vine.create({
  page: vine.number().positive().optional(),
  limit: vine.number().positive().optional(),
});
