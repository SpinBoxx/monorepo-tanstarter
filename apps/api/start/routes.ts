/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router';
import { controllers } from '#generated/controllers';
import { middleware } from '#start/kernel';
import { authRoutes } from '../app/routes/auth/auth.routes.js';

router.get('/', () => {
  return { hello: 'world' };
});

router
  .group(() => {
    authRoutes();
    router
      .group(() => {
        router.get('profile', [controllers.user.Profile, 'show']);
        router.post('logout', [controllers.auth.AccessTokens, 'destroy']);
        router.post('update', [controllers.user.Profile, 'update']);
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth());
  })
  .prefix('/api/v1');
