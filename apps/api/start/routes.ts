/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router';
import { authRoutes } from '../app/routes/auth/auth.routes.js';
import { userRoutes } from '../app/routes/user/user.routes.ts';

router.get('/', () => {
  return { hello: 'world' };
});

router
  .group(() => {
    authRoutes();
    userRoutes();
  })
  .prefix('/api/v1');
