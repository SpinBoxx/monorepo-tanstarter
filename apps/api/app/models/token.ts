import string from '@adonisjs/core/helpers/string';
import { belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import { DateTime } from 'luxon';
import { TokenSchema } from '#database/schema';
import { TOKEN_TYPES, type TokenType } from '#types/token';
import User from './user.ts';

export default class Token extends TokenSchema {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare userId: number | null;

  @column()
  declare type: TokenType;

  @column()
  declare token: string;

  @column.dateTime()
  declare expiresAt: DateTime;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>;

  public static async generateVerifyEmailToken(user: User) {
    const token = string.generateRandom(64);

    await Token.expireTokens(user, TOKEN_TYPES.VERIFY_EMAIL);
    const record = await user.related('tokens').create({
      type: TOKEN_TYPES.VERIFY_EMAIL,
      expiresAt: DateTime.now().plus({ hours: 24 }),
      token,
    });

    return record.token;
  }

  public static async generatePasswordResetToken(user: User | null) {
    const token = string.generateRandom(64);

    if (!user) return token;

    await Token.expireTokens(user, TOKEN_TYPES.PASSWORD_RESET);
    const record = await user.related('tokens').create({
      type: TOKEN_TYPES.PASSWORD_RESET,
      expiresAt: DateTime.now().plus({ hour: 1 }),
      token,
    });

    return record.token;
  }

  public static async expireTokens(
    user: User,
    type: TokenType,
  ) {
    await Token.query().where('userId', user.id).where('type', type).update({
      expiresAt: DateTime.now().toSQL(),
    });
  }

  public static async getTokenUser(token: string, type: TokenType) {
    const record = await Token.query()
      .preload('user')
      .where('token', token)
      .where('type', type)
      .where('expiresAt', '>', DateTime.now().toSQL())
      .orderBy('createdAt', 'desc')
      .first();

    return record?.user;
  }

  public static async verify(token: string, type: TokenType) {
    const record = await Token.query()
      .where('expiresAt', '>', DateTime.now().toSQL())
      .where('token', token)
      .where('type', type)
      .first();

    return !!record;
  }

  public static async findValid(token: string, type: TokenType) {
    return Token.query()
      .preload('user')
      .where('expiresAt', '>', DateTime.now().toSQL())
      .where('token', token)
      .where('type', type)
      .orderBy('createdAt', 'desc')
      .first();
  }
}
