import router from '@adonisjs/core/services/router';
import { controllers } from '#generated/controllers';
import { middleware } from '#start/kernel';

export function userRoutes() {
  router
    .group(() => {
      router.get('profile', [controllers.user.User, 'show']).as('show');
      router
        .post('logout', [controllers.auth.AccessTokens, 'destroy'])
        .as('logout');
      router.post('update', [controllers.user.User, 'update']).as('update');
      router
        .get('list', [controllers.user.User, 'list'])
        .as('list')
        .use(middleware.admin());
      router
        .delete('delete/:id', [controllers.user.User, 'delete'])
        .as('delete')
        .use(middleware.admin());
    })
    .prefix('account')
    .as('profile')
    .use(middleware.auth());
}
