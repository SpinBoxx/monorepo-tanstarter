import type { HttpContext } from '@adonisjs/core/http';
import User from '#models/user';
import EmailVerificationService from '#services/email_verification_service';
import UserTransformer from '#transformers/user-transformer';
import {
  resendVerificationEmailValidator,
  verifyEmailValidator,
} from '#validators/auth/verify-email.validator';

const RESEND_VERIFICATION_MESSAGE =
  'If this email exists and needs verification, a new email has been sent';

export default class EmailVerificationController {
  async verify({ request, response, serialize }: HttpContext) {
    if (!request.hasValidSignature()) {
      return response.badRequest({
        message: 'Invalid or expired email verification link',
      });
    }

    const { token } = await request.validateUsing(verifyEmailValidator, {
      data: {
        token: request.input('token') ?? request.qs().token,
      },
    });

    const user = await EmailVerificationService.verifyToken(token);
    const accessToken = await User.accessTokens.create(user);

    return serialize({
      user: UserTransformer.transform(user),
      token: accessToken.value!.release(),
    });
  }

  async resend({ request }: HttpContext) {
    const { email } = await request.validateUsing(
      resendVerificationEmailValidator,
    );
    const user = await User.findBy('email', email);

    if (user && !user.emailVerifiedAt) {
      await EmailVerificationService.sendVerificationEmail(user);
    }

    return { message: RESEND_VERIFICATION_MESSAGE };
  }
}
