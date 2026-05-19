import {
  type AccessToken,
  DbAccessTokensProvider,
} from '@adonisjs/auth/access_tokens';
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid';
import { compose } from '@adonisjs/core/helpers';
import hash from '@adonisjs/core/services/hash';
import { UserSchema } from '#database/schema';
import { USER_ROLES, type UserRoleValue } from '../types/role.ts';

export default class User extends compose(UserSchema, withAuthFinder(hash)) {
  static accessTokens = DbAccessTokensProvider.forModel(User);
  declare currentAccessToken?: AccessToken;
  declare role: UserRoleValue;

  hasRole(role: UserRoleValue) {
    return this.role === role;
  }

  get isAdmin() {
    return this.hasRole(USER_ROLES.ADMIN);
  }

  get initials() {
    const [first, last] = this.fullName
      ? this.fullName.split(' ')
      : this.email.split('@');
    if (!first) return '';
    if (first && last) {
      return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
    }
    return `${first.slice(0, 2)}`.toUpperCase();
  }
}
