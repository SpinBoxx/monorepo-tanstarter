import router from '@adonisjs/core/services/router';
import { controllers } from '#generated/controllers';
import { middleware } from '#start/kernel';

export function authRoutes() {
  router
    .group(() => {
      router.post('signup', [controllers.auth.NewAccount, 'store']);
      router.post('login', [controllers.auth.AccessTokens, 'store']);
      router
        .get('admin', () => {
          return { message: 'Welcome, admin!' };
        })
        .as('admin')
        .use(middleware.admin());
    })
    .prefix('auth')
    .as('auth');
}
