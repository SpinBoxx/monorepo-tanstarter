import router from '@adonisjs/core/services/router';
import { controllers } from '#generated/controllers';
import { middleware } from '#start/kernel';

export function authRoutes() {
  router
    .group(() => {
      router
        .post('signup', [controllers.auth.NewAccount, 'store'])
        .as('signup');
      router
        .post('login', [controllers.auth.AccessTokens, 'store'])
        .as('login');
      router
        .post('email/verify', [controllers.auth.EmailVerification, 'verify'])
        .as('email.verify');
      router
        .post('email/verification/resend', [
          controllers.auth.EmailVerification,
          'resend',
        ])
        .as('email.verification.resend');
      router
        .post('password/forgot', [controllers.auth.PasswordReset, 'request'])
        .as('password.forgot');
      router
        .post('password/reset', [controllers.auth.PasswordReset, 'reset'])
        .as('password.reset');
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
