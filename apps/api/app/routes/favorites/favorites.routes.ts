import router from '@adonisjs/core/services/router';
import { middleware } from '#start/kernel';

const FavoritesController = () =>
  import('#controllers/favorites/favorites_controller');

export function favoritesRoutes() {
  router
    .group(() => {
      router.get('favorites', [FavoritesController, 'index']).as('index');
      router.post('favorites', [FavoritesController, 'store']).as('store');
      router
        .delete('favorites', [FavoritesController, 'destroy'])
        .as('destroy');
    })
    .as('favorites')
    .use(middleware.auth());
}
