import { Exception } from '@adonisjs/core/exceptions';
import mail from '@adonisjs/mail/services/main';
import { DateTime } from 'luxon';
import VerifyEmailNotification from '#mails/verify_email_notification';
import Token from '#models/token';
import type User from '#models/user';
import { TOKEN_TYPES } from '#types/token';

export default class EmailVerificationService {
  static async sendVerificationEmail(user: User) {
    const token = await Token.generateVerifyEmailToken(user);

    await mail.send(new VerifyEmailNotification(user, token));

    return token;
  }

  static async verifyToken(token: string) {
    const record = await Token.findValid(token, TOKEN_TYPES.VERIFY_EMAIL);

    if (!record?.user) {
      throw new Exception('Invalid or expired email verification token', {
        status: 400,
      });
    }

    await EmailVerificationService.markUserAsVerified(record.user);

    return record.user;
  }

  static async markUserAsVerified(user: User) {
    if (!user.emailVerifiedAt) {
      user.emailVerifiedAt = DateTime.now();
      await user.save();
    }

    await Token.expireTokens(user, TOKEN_TYPES.VERIFY_EMAIL);
  }
}
