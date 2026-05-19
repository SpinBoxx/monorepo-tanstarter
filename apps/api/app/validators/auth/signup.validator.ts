import vine from '@vinejs/vine';

export const email = () => vine.string().email();
export const password = () => vine.string().minLength(8);
/**
 * Validator to use when performing self-signup
 */
export const signupValidator = vine.create({
  fullName: vine.string().nullable(),
  email: email().unique({ table: 'users', column: 'email' }),
  password: password(),
  passwordConfirmation: password().sameAs('password'),
});
