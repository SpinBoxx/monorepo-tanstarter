import type { Authenticators } from '@adonisjs/auth/types';
import type { HttpContext } from '@adonisjs/core/http';
import type { NextFn } from '@adonisjs/core/types/http';
import User from '#models/user';

/**
 * Auth middleware is used authenticate HTTP requests and deny
 * access to unauthenticated users.
 */
export default class AdminMiddleware {
  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[];
    } = {},
  ) {
    const user = ctx.auth.getUserOrFail();
    if (!user || !user.isAdmin) {
      return ctx.response.forbidden({
        message: "You don't have permission to access this resource",
      });
    }

    return next();
  }
}
