import { test } from '@japa/runner';
import { signedUrlFor } from '@adonisjs/core/services/url_builder';
import mail from '@adonisjs/mail/services/main';
import { DateTime } from 'luxon';
import db from '@adonisjs/lucid/services/db';
import Token from '#models/token';
import User from '#models/user';
import VerifyEmailNotification from '#mails/verify_email_notification';

type ApiBody = {
  data: {
    message?: string;
    token?: string;
    user: {
      emailVerified: boolean;
    };
  };
};

const signupPayload = (email = `jane.${Date.now()}@example.com`) => ({
  fullName: 'Jane Doe',
  email,
  password: 'password123',
  passwordConfirmation: 'password123',
});

const signedVerifyPath = (token: string) => {
  const url = new URL(
    signedUrlFor(
      'auth.email.verify',
      {},
      {
        qs: { token },
        prefixUrl: 'http://localhost:3333',
      },
    ),
  );

  return `${url.pathname}${url.search}`;
};

test.group('email verification', (group) => {
  group.each.setup(async () => {
    await db.from('auth_access_tokens').delete();
    await Token.query().delete();
    await User.query().delete();
  });

  test('signup creates an unverified user, sends verification email, and does not issue access token', async ({
    client,
    assert,
  }) => {
    const mailer = mail.fake();
    const payload = signupPayload();

    const response = await client.post('/api/v1/auth/signup').json(payload);

    response.assertStatus(200);
    const body = response.body() as ApiBody;
    assert.notProperty(body.data, 'token');
    assert.equal(body.data.message, 'Verification email sent');
    assert.isFalse(body.data.user.emailVerified);

    const user = await User.findByOrFail('email', payload.email);
    assert.isNull(user.emailVerifiedAt);

    const token = await Token.query()
      .where('userId', user.id)
      .where('type', 'VERIFY_EMAIL')
      .firstOrFail();

    assert.isAbove(token.token.length, 0);
    mailer.mails.assertSent(VerifyEmailNotification, (message) => {
      return message.user.id === user.id && message.token === token.token;
    });

    mail.restore();
  });

  test('login rejects users with an unverified email', async ({ client }) => {
    const user = await User.create({
      fullName: 'Jane Doe',
      email: 'jane.login@example.com',
      password: 'password123',
    });

    const response = await client.post('/api/v1/auth/login').json({
      email: user.email,
      password: 'password123',
    });

    response.assertStatus(403);
    response.assertBodyContains({
      message: 'Email address must be verified before login',
    });
  });

  test('verify rejects invalid or unsigned verification requests', async ({
    client,
  }) => {
    const unsignedResponse = await client
      .post('/api/v1/auth/email/verify')
      .json({ token: 'invalid-token' });

    unsignedResponse.assertStatus(400);

    const signedResponse = await client.post(signedVerifyPath('invalid-token'));

    signedResponse.assertStatus(400);
    signedResponse.assertBodyContains({
      message: 'Invalid or expired email verification token',
    });
  });

  test('verify marks the user as verified, expires verification tokens, and returns an access token', async ({
    client,
    assert,
  }) => {
    const user = await User.create({
      fullName: 'Jane Doe',
      email: 'jane.verify@example.com',
      password: 'password123',
    });
    const staleToken = await Token.create({
      userId: user.id,
      type: 'VERIFY_EMAIL',
      token: 'stale-verification-token',
      expiresAt: DateTime.now().plus({ hours: 24 }),
    });
    const token = await Token.generateVerifyEmailToken(user);

    const response = await client.post(signedVerifyPath(token));

    response.assertStatus(200);
    const body = response.body() as ApiBody;
    assert.isString(body.data.token);
    assert.isTrue(body.data.user.emailVerified);

    await user.refresh();
    assert.isNotNull(user.emailVerifiedAt);

    await staleToken.refresh();
    assert.isTrue(staleToken.expiresAt <= DateTime.now());

    const activeTokens = await Token.query()
      .where('userId', user.id)
      .where('type', 'VERIFY_EMAIL')
      .where('expiresAt', '>', DateTime.now().toSQL())
      .count('* as total')
      .firstOrFail();

    assert.equal(Number(activeTokens.$extras.total), 0);
  });

  test('resend is public, sends a new email for unverified users, and stays neutral otherwise', async ({
    client,
  }) => {
    const mailer = mail.fake();
    const user = await User.create({
      fullName: 'Jane Doe',
      email: 'jane.resend@example.com',
      password: 'password123',
    });

    const resendResponse = await client
      .post('/api/v1/auth/email/verification/resend')
      .json({ email: user.email });

    resendResponse.assertStatus(200);
    resendResponse.assertBodyContains({
      message:
        'If this email exists and needs verification, a new email has been sent',
    });
    mailer.mails.assertSentCount(VerifyEmailNotification, 1);

    user.emailVerifiedAt = DateTime.now();
    await user.save();

    const verifiedResponse = await client
      .post('/api/v1/auth/email/verification/resend')
      .json({ email: user.email });

    verifiedResponse.assertStatus(200);
    verifiedResponse.assertBodyContains({
      message:
        'If this email exists and needs verification, a new email has been sent',
    });
    mailer.mails.assertSentCount(VerifyEmailNotification, 1);

    const unknownEmailResponse = await client
      .post('/api/v1/auth/email/verification/resend')
      .json({ email: 'missing@example.com' });

    unknownEmailResponse.assertStatus(200);
    unknownEmailResponse.assertBodyContains({
      message:
        'If this email exists and needs verification, a new email has been sent',
    });
    mailer.mails.assertSentCount(VerifyEmailNotification, 1);

    mail.restore();
  });
});
