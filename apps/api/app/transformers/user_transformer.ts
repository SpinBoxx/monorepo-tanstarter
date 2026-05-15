import { BaseTransformer } from '@adonisjs/core/transformers';
import type User from '#models/user';
import type { User as ApiUser } from '../../types/user.js';

export default class UserTransformer extends BaseTransformer<User> {
  toObject(): ApiUser {
    return {
      id: this.resource.id,
      fullName: this.resource.fullName,
      email: this.resource.email,
      createdAt: this.resource.createdAt.toISO() ?? '',
      updatedAt: this.resource.updatedAt?.toISO() ?? null,
      initials: this.resource.initials,
    };
  }
}
