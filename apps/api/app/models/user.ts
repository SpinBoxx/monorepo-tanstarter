import {
  type AccessToken,
  DbAccessTokensProvider,
} from '@adonisjs/auth/access_tokens';
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid';
import { compose } from '@adonisjs/core/helpers';
import hash from '@adonisjs/core/services/hash';
import { hasMany } from '@adonisjs/lucid/orm';
import type { HasMany } from '@adonisjs/lucid/types/relations';
import type { DateTime } from 'luxon';
import { UserSchema } from '#database/schema';
import { TOKEN_TYPES } from '#types/token';
import { USER_ROLES, type UserRoleValue } from '../types/role.ts';
import Cart from './cart.ts';
import CustomerAddress from './customer_address.ts';
import Favorite from './favorite.ts';
import Order from './order.ts';
import Token from './token.ts';

export default class User extends compose(UserSchema, withAuthFinder(hash)) {
  static accessTokens = DbAccessTokensProvider.forModel(User);
  declare currentAccessToken?: AccessToken;
  declare role: UserRoleValue;
  declare emailVerifiedAt: DateTime | null;

  @hasMany(() => Token)
  declare tokens: HasMany<typeof Token>;

  @hasMany(() => CustomerAddress)
  declare addresses: HasMany<typeof CustomerAddress>;

  @hasMany(() => Cart)
  declare carts: HasMany<typeof Cart>;

  @hasMany(() => Order)
  declare orders: HasMany<typeof Order>;

  @hasMany(() => Favorite)
  declare favorites: HasMany<typeof Favorite>;

  /**
   * Narrows the generic tokens relation to password reset tokens only.
   */
  @hasMany(() => Token, {
    onQuery: (query) => query.where('type', TOKEN_TYPES.PASSWORD_RESET),
  })
  declare passwordResetTokens: HasMany<typeof Token>;

  /**
   * Narrows the generic tokens relation to email verification tokens only.
   */
  @hasMany(() => Token, {
    onQuery: (query) => query.where('type', TOKEN_TYPES.VERIFY_EMAIL),
  })
  declare verifyEmailTokens: HasMany<typeof Token>;

  hasRole(role: UserRoleValue) {
    return this.role === role;
  }

  get isAdmin() {
    return this.hasRole(USER_ROLES.ADMIN);
  }

  get emailVerified() {
    return !!this.emailVerifiedAt;
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
