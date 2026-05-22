import vine from '@vinejs/vine';
import { email, password } from './signup.validator.ts';

export const forgotPasswordValidator = vine.create({
  email: email(),
});

export const resetPasswordValidator = vine.create({
  token: vine.string().minLength(1),
  password: password(),
  passwordConfirmation: password().sameAs('password'),
});
