import { BaseMail } from '@adonisjs/mail';
import { signedUrlFor } from '@adonisjs/core/services/url_builder';
import env from '#start/env';
import type User from '#models/user';

export default class VerifyEmailNotification extends BaseMail {
  subject = 'Verify your email address';

  constructor(
    public user: User,
    public token: string,
  ) {
    super();
  }

  prepare() {
    const verificationUrl = signedUrlFor(
      'auth.email.verify',
      {},
      {
        qs: { token: this.token },
        expiresIn: '24 hours',
        prefixUrl: env.get('FRONTEND_URL'),
      },
    );

    this.message
      .to(this.user.email)
      .subject(this.subject)
      .html(
        `<p>Verify your email address by opening this link: <a href="${verificationUrl}">Verify email</a></p>`,
      )
      .text(`Verify your email address: ${verificationUrl}`);
  }
}
