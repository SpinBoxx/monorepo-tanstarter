import { test } from '@japa/runner';
import { signedUrlFor } from '@adonisjs/core/services/url_builder';
import mail from '@adonisjs/mail/services/main';
import { DateTime } from 'luxon';
import db from '@adonisjs/lucid/services/db';
import ResetPasswordNotification from '#mails/reset_password_notification';
import Token from '#models/token';
import User from '#models/user';

type ApiBody = {
  data: {
    token?: string;
  };
};

const FORGOT_PASSWORD_MESSAGE =
  'If this email exists, a password reset link has been sent';

const signedResetPath = (token: string) => {
  const url = new URL(
    signedUrlFor(
      'auth.password.reset',
      {},
      {
        qs: { token },
        prefixUrl: 'http://localhost:3333',
      },
    ),
  );

  return `${url.pathname}${url.search}`;
};

test.group('password reset', (group) => {
  group.each.setup(async () => {
    await db.from('auth_access_tokens').delete();
    await Token.query().delete();
    await User.query().delete();
  });

  test('forgot request for an existing user creates a password reset token and sends reset email', async ({
    client,
    assert,
  }) => {
    const mailer = mail.fake();
    const user = await User.create({
      fullName: 'Jane Doe',
      email: 'jane.forgot@example.com',
      password: 'password123',
    });

    const response = await client
      .post('/api/v1/auth/password/forgot')
      .json({ email: user.email });

    response.assertStatus(200);
    response.assertBodyContains({
      message: FORGOT_PASSWORD_MESSAGE,
    });

    const token = await Token.query()
      .where('userId', user.id)
      .where('type', 'PASSWORD_RESET')
      .firstOrFail();

    assert.isAbove(token.token.length, 0);
    mailer.mails.assertSent(ResetPasswordNotification, (message) => {
      return message.user.id === user.id && message.token === token.token;
    });

    mail.restore();
  });

  test('forgot request for an unknown email stays neutral and sends no email', async ({
    client,
  }) => {
    const mailer = mail.fake();

    const response = await client
      .post('/api/v1/auth/password/forgot')
      .json({ email: 'missing@example.com' });

    response.assertStatus(200);
    response.assertBodyContains({
      message: FORGOT_PASSWORD_MESSAGE,
    });
    mailer.mails.assertSentCount(0);

    mail.restore();
  });

  test('forgot request expires older password reset tokens', async ({
    client,
    assert,
  }) => {
    const mailer = mail.fake();
    const user = await User.create({
      fullName: 'Jane Doe',
      email: 'jane.expire@example.com',
      password: 'password123',
    });
    const staleToken = await Token.create({
      userId: user.id,
      type: 'PASSWORD_RESET',
      token: 'stale-password-reset-token',
      expiresAt: DateTime.now().plus({ hour: 1 }),
    });

    const response = await client
      .post('/api/v1/auth/password/forgot')
      .json({ email: user.email });

    response.assertStatus(200);

    await staleToken.refresh();
    assert.isTrue(staleToken.expiresAt <= DateTime.now());

    const activeTokens = await Token.query()
      .where('userId', user.id)
      .where('type', 'PASSWORD_RESET')
      .where('expiresAt', '>', DateTime.now().toSQL())
      .count('* as total')
      .firstOrFail();

    assert.equal(Number(activeTokens.$extras.total), 1);

    mail.restore();
  });

  test('reset rejects unsigned password reset requests', async ({ client }) => {
    const response = await client
      .post('/api/v1/auth/password/reset')
      .json({
        token: 'invalid-token',
        password: 'new-password123',
        passwordConfirmation: 'new-password123',
      });

    response.assertStatus(400);
    response.assertBodyContains({
      message: 'Invalid or expired password reset link',
    });
  });

  test('reset rejects signed requests with invalid or expired token', async ({
    client,
  }) => {
    const response = await client
      .post(signedResetPath('invalid-token'))
      .json({
        password: 'new-password123',
        passwordConfirmation: 'new-password123',
      });

    response.assertStatus(400);
    response.assertBodyContains({
      message: 'Invalid or expired password reset token',
    });
  });

  test('reset updates password, expires reset tokens, and does not issue access token', async ({
    client,
    assert,
  }) => {
    const user = await User.create({
      fullName: 'Jane Doe',
      email: 'jane.reset@example.com',
      password: 'password123',
      emailVerifiedAt: DateTime.now(),
    });
    const token = await Token.generatePasswordResetToken(user);

    const response = await client.post(signedResetPath(token)).json({
      password: 'new-password123',
      passwordConfirmation: 'new-password123',
    });

    response.assertStatus(200);
    response.assertBodyContains({
      message: 'Password reset successfully',
    });
    assert.notProperty(response.body(), 'token');

    const activeTokens = await Token.query()
      .where('userId', user.id)
      .where('type', 'PASSWORD_RESET')
      .where('expiresAt', '>', DateTime.now().toSQL())
      .count('* as total')
      .firstOrFail();

    assert.equal(Number(activeTokens.$extras.total), 0);

    const oldPasswordResponse = await client.post('/api/v1/auth/login').json({
      email: user.email,
      password: 'password123',
    });
    oldPasswordResponse.assertStatus(400);

    const newPasswordResponse = await client.post('/api/v1/auth/login').json({
      email: user.email,
      password: 'new-password123',
    });
    newPasswordResponse.assertStatus(200);
    assert.isString((newPasswordResponse.body() as ApiBody).data.token);
  });
});
