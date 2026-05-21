import vine from '@vinejs/vine';

export const verifyEmailValidator = vine.create({
  token: vine.string().minLength(1),
});

export const resendVerificationEmailValidator = vine.create({
  email: vine.string().email(),
});
