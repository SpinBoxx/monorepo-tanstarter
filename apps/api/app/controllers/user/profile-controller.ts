import type { HttpContext } from '@adonisjs/core/http';
import UserTransformer from '#transformers/user-transformer';
import { updateUserValidator } from '#validators/user/update-user.validator';

export default class ProfileController {
  async show({ auth, serialize }: HttpContext) {
    return serialize(UserTransformer.transform(auth.getUserOrFail()));
  }

  async update({ auth, request, serialize }: HttpContext) {
    const payload = await request.validateUsing(updateUserValidator);

    const user = auth.getUserOrFail();
    user.merge(payload);
    await user.save();
    return serialize(UserTransformer.transform(user));
  }
}
