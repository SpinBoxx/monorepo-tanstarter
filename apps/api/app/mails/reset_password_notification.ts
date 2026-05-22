import { signedUrlFor } from '@adonisjs/core/services/url_builder';
import { BaseMail } from '@adonisjs/mail';
import type User from '#models/user';
import env from '#start/env';

export default class ResetPasswordNotification extends BaseMail {
  subject = 'Reset your password';

  constructor(
    public user: User,
    public token: string,
  ) {
    super();
  }

  /**
   * Builds the reset password email with a one-hour signed frontend URL.
   */
  prepare() {
    const resetUrl = signedUrlFor(
      'auth.password.reset',
      {},
      {
        qs: { token: this.token },
        expiresIn: '1 hour',
        prefixUrl: env.get('FRONTEND_URL'),
      },
    );

    this.message
      .to(this.user.email)
      .subject(this.subject)
      .html(
        `<p>Reset your password by opening this link: <a href="${resetUrl}">Reset password</a></p>`,
      )
      .text(`Reset your password: ${resetUrl}`);
  }
}
