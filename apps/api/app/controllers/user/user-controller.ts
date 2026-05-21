import type { HttpContext } from '@adonisjs/core/http';
import { request } from 'http';
import User from '#models/user';
import UserTransformer from '#transformers/user-transformer';
import { listUserValidator } from '#validators/user/list-user.validator';
import { updateUserValidator } from '#validators/user/update-user.validator';

export default class UserController {
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

  async list({ serialize, request }: HttpContext) {
    const params = await request.validateUsing(listUserValidator);

    const users = await User.query().paginate(
      params.page || 1,
      params.limit || 10,
    );
    return serialize(UserTransformer.transform(users));
  }

  async delete({ auth, params }: HttpContext) {
    const userId = params.id;
    const user = await User.find(userId);
    if (!user) {
      return { message: 'User not found' };
    }
    if (user.email === auth.getUserOrFail().email) {
      await user.delete();
      return { message: 'Account deleted successfully' };
    }
    return { message: 'Unauthorized' };
  }
}
