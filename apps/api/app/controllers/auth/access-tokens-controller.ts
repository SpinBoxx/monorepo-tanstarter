import type { HttpContext } from '@adonisjs/core/http';
import User from '#models/user';
import UserTransformer from '#transformers/user-transformer';
import { loginValidator } from '#validators/auth/login.validator';

export default class AccessTokensController {
  async store({ request, response, serialize }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator);

    const user = await User.verifyCredentials(email, password);
    if (!user.emailVerifiedAt) {
      return response.forbidden({
        message: 'Email address must be verified before login',
      });
    }

    const token = await User.accessTokens.create(user);

    return serialize({
      user: UserTransformer.transform(user),
      token: token.value!.release(),
    });
  }

  async destroy({ auth }: HttpContext) {
    const user = auth.getUserOrFail();
    if (user.currentAccessToken) {
      await User.accessTokens.delete(user, user.currentAccessToken.identifier);
    }

    return {
      message: 'Logged out successfully',
    };
  }
}
