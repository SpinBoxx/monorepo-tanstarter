import { Exception } from '@adonisjs/core/exceptions';
import mail from '@adonisjs/mail/services/main';
import ResetPasswordNotification from '#mails/reset_password_notification';
import Token from '#models/token';
import type User from '#models/user';
import { TOKEN_TYPES } from '#types/token';

export default class PasswordResetService {
  /**
   * Sends a password reset email when the user exists.
   * Unknown emails still receive a generated but unpersisted token to keep the
   * public forgot password flow from revealing whether an account exists.
   */
  static async sendResetPasswordEmail(user: User | null) {
    const token = await Token.generatePasswordResetToken(user);

    if (user) {
      await mail.send(new ResetPasswordNotification(user, token));
    }

    return token;
  }

  /**
   * Updates the user's password from a valid password reset token.
   * Throws a 400 exception when the token is missing, expired, or not attached
   * to a user, then expires all password reset tokens after a successful reset.
   */
  static async resetPassword(token: string, password: string) {
    const record = await Token.findValid(token, TOKEN_TYPES.PASSWORD_RESET);

    if (!record?.user) {
      throw new Exception('Invalid or expired password reset token', {
        status: 400,
      });
    }

    record.user.password = password;
    await record.user.save();
    await Token.expireTokens(record.user, TOKEN_TYPES.PASSWORD_RESET);

    return record.user;
  }
}
