/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router';
import { catalogRoutes } from '../app/routes/commerce/catalog.routes.js';
import { authRoutes } from '../app/routes/auth/auth.routes.js';
import { favoritesRoutes } from '../app/routes/favorites/favorites.routes.js';
import { userRoutes } from '../app/routes/user/user.routes.ts';

router.get('/', () => {
  return { hello: 'world' };
});

router
  .group(() => {
    authRoutes();
    userRoutes();
    catalogRoutes();
    favoritesRoutes();
  })
  .prefix('/api/v1');
