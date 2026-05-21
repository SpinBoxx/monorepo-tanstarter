import type { HttpContext } from '@adonisjs/core/http';
import User from '#models/user';
import EmailVerificationService from '#services/email_verification_service';
import UserTransformer from '#transformers/user-transformer';
import { signupValidator } from '#validators/auth/signup.validator';

export default class NewAccountController {
  async store({ request, serialize }: HttpContext) {
    const { fullName, email, password } =
      await request.validateUsing(signupValidator);

    const user = await User.create({ fullName, email, password });
    await EmailVerificationService.sendVerificationEmail(user);

    return serialize({
      user: UserTransformer.transform(user),
      message: 'Verification email sent',
    });
  }
}
