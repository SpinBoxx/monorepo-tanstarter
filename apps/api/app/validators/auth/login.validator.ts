import vine from '@vinejs/vine';
import { email } from './signup.validator.ts';

/**
 * Validator to use before validating user credentials
 * during login
 */
export const loginValidator = vine.create({
  email: email(),
  password: vine.string(),
});
