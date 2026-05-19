import { BaseTransformer } from '@adonisjs/core/transformers';
import type User from '#models/user';

export default class UserTransformer extends BaseTransformer<User> {
  toObject() {
    return {
      id: this.resource.id,
      fullName: this.resource.fullName,
      email: this.resource.email,
      role: this.resource.role,
      createdAt: this.resource.createdAt.toISO() ?? '',
      updatedAt: this.resource.updatedAt?.toISO() ?? null,
      initials: this.resource.initials,
    };
  }
}
