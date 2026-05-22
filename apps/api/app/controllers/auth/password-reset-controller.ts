import type { HttpContext } from '@adonisjs/core/http';
import User from '#models/user';
import PasswordResetService from '#services/password_reset_service';
import {
  forgotPasswordValidator,
  resetPasswordValidator,
} from '#validators/auth/reset-password.validator';

const FORGOT_PASSWORD_MESSAGE =
  'If this email exists, a password reset link has been sent';

export default class PasswordResetController {
  /**
   * Starts the public forgot password flow.
   * Always returns the same message to avoid leaking whether the email exists.
   */
  async request({ request }: HttpContext) {
    const { email } = await request.validateUsing(forgotPasswordValidator);
    const user = await User.findBy('email', email);

    await PasswordResetService.sendResetPasswordEmail(user);

    return { message: FORGOT_PASSWORD_MESSAGE };
  }

  /**
   * Completes the password reset from a signed URL and a valid reset token.
   * The token may come from the request body or the signed query string.
   */
  async reset({ request, response }: HttpContext) {
    if (!request.hasValidSignature()) {
      return response.badRequest({
        message: 'Invalid or expired password reset link',
      });
    }

    const { token, password } = await request.validateUsing(
      resetPasswordValidator,
      {
        data: {
          token: request.input('token') ?? request.qs().token,
          password: request.input('password'),
          passwordConfirmation: request.input('passwordConfirmation'),
        },
      },
    );

    await PasswordResetService.resetPassword(token, password);

    return { message: 'Password reset successfully' };
  }
}
