import router from '@adonisjs/core/services/router';
import { controllers } from '#generated/controllers';
import { middleware } from '#start/kernel';

export function catalogRoutes() {
  router
    .group(() => {
      router
        .get('restaurants', [controllers.commerce.Restaurants, 'index'])
        .as('restaurants.index');
      router
        .get('restaurants/:id', [controllers.commerce.Restaurants, 'show'])
        .as('restaurants.show');
      router
        .post('restaurants', [controllers.commerce.Restaurants, 'store'])
        .as('restaurants.store')
        .use([middleware.auth(), middleware.admin()]);
      router
        .put('restaurants/:id', [controllers.commerce.Restaurants, 'update'])
        .as('restaurants.update')
        .use([middleware.auth(), middleware.admin()]);
      router
        .patch('restaurants/:id', [controllers.commerce.Restaurants, 'update'])
        .as('restaurants.patch')
        .use([middleware.auth(), middleware.admin()]);
      router
        .delete('restaurants/:id', [
          controllers.commerce.Restaurants,
          'destroy',
        ])
        .as('restaurants.destroy')
        .use([middleware.auth(), middleware.admin()]);

      router
        .get('product-categories', [
          controllers.commerce.ProductCategories,
          'index',
        ])
        .as('productCategories.index');
      router
        .get('product-categories/:id', [
          controllers.commerce.ProductCategories,
          'show',
        ])
        .as('productCategories.show');
      router
        .post('product-categories', [
          controllers.commerce.ProductCategories,
          'store',
        ])
        .as('productCategories.store')
        .use([middleware.auth(), middleware.admin()]);
      router
        .put('product-categories/:id', [
          controllers.commerce.ProductCategories,
          'update',
        ])
        .as('productCategories.update')
        .use([middleware.auth(), middleware.admin()]);
      router
        .patch('product-categories/:id', [
          controllers.commerce.ProductCategories,
          'update',
        ])
        .as('productCategories.patch')
        .use([middleware.auth(), middleware.admin()]);
      router
        .delete('product-categories/:id', [
          controllers.commerce.ProductCategories,
          'destroy',
        ])
        .as('productCategories.destroy')
        .use([middleware.auth(), middleware.admin()]);

      router
        .get('menu-items', [controllers.commerce.MenuItems, 'index'])
        .as('menuItems.index');
      router
        .get('menu-items/:id', [controllers.commerce.MenuItems, 'show'])
        .as('menuItems.show');
      router
        .post('menu-items', [controllers.commerce.MenuItems, 'store'])
        .as('menuItems.store')
        .use([middleware.auth(), middleware.admin()]);
      router
        .put('menu-items/:id', [controllers.commerce.MenuItems, 'update'])
        .as('menuItems.update')
        .use([middleware.auth(), middleware.admin()]);
      router
        .patch('menu-items/:id', [controllers.commerce.MenuItems, 'update'])
        .as('menuItems.patch')
        .use([middleware.auth(), middleware.admin()]);
      router
        .delete('menu-items/:id', [controllers.commerce.MenuItems, 'destroy'])
        .as('menuItems.destroy')
        .use([middleware.auth(), middleware.admin()]);

      router
        .get('menu-item-variants', [
          controllers.commerce.MenuItemVariants,
          'index',
        ])
        .as('menuItemVariants.index');
      router
        .get('menu-item-variants/:id', [
          controllers.commerce.MenuItemVariants,
          'show',
        ])
        .as('menuItemVariants.show');
      router
        .post('menu-item-variants', [
          controllers.commerce.MenuItemVariants,
          'store',
        ])
        .as('menuItemVariants.store')
        .use([middleware.auth(), middleware.admin()]);
      router
        .put('menu-item-variants/:id', [
          controllers.commerce.MenuItemVariants,
          'update',
        ])
        .as('menuItemVariants.update')
        .use([middleware.auth(), middleware.admin()]);
      router
        .patch('menu-item-variants/:id', [
          controllers.commerce.MenuItemVariants,
          'update',
        ])
        .as('menuItemVariants.patch')
        .use([middleware.auth(), middleware.admin()]);
      router
        .delete('menu-item-variants/:id', [
          controllers.commerce.MenuItemVariants,
          'destroy',
        ])
        .as('menuItemVariants.destroy')
        .use([middleware.auth(), middleware.admin()]);

      router
        .get('menu-item-option-groups', [
          controllers.commerce.MenuItemOptionGroups,
          'index',
        ])
        .as('menuItemOptionGroups.index');
      router
        .get('menu-item-option-groups/:id', [
          controllers.commerce.MenuItemOptionGroups,
          'show',
        ])
        .as('menuItemOptionGroups.show');
      router
        .post('menu-item-option-groups', [
          controllers.commerce.MenuItemOptionGroups,
          'store',
        ])
        .as('menuItemOptionGroups.store')
        .use([middleware.auth(), middleware.admin()]);
      router
        .put('menu-item-option-groups/:id', [
          controllers.commerce.MenuItemOptionGroups,
          'update',
        ])
        .as('menuItemOptionGroups.update')
        .use([middleware.auth(), middleware.admin()]);
      router
        .patch('menu-item-option-groups/:id', [
          controllers.commerce.MenuItemOptionGroups,
          'update',
        ])
        .as('menuItemOptionGroups.patch')
        .use([middleware.auth(), middleware.admin()]);
      router
        .delete('menu-item-option-groups/:id', [
          controllers.commerce.MenuItemOptionGroups,
          'destroy',
        ])
        .as('menuItemOptionGroups.destroy')
        .use([middleware.auth(), middleware.admin()]);

      router
        .get('menu-item-options', [
          controllers.commerce.MenuItemOptions,
          'index',
        ])
        .as('menuItemOptions.index');
      router
        .get('menu-item-options/:id', [
          controllers.commerce.MenuItemOptions,
          'show',
        ])
        .as('menuItemOptions.show');
      router
        .post('menu-item-options', [
          controllers.commerce.MenuItemOptions,
          'store',
        ])
        .as('menuItemOptions.store')
        .use([middleware.auth(), middleware.admin()]);
      router
        .put('menu-item-options/:id', [
          controllers.commerce.MenuItemOptions,
          'update',
        ])
        .as('menuItemOptions.update')
        .use([middleware.auth(), middleware.admin()]);
      router
        .patch('menu-item-options/:id', [
          controllers.commerce.MenuItemOptions,
          'update',
        ])
        .as('menuItemOptions.patch')
        .use([middleware.auth(), middleware.admin()]);
      router
        .delete('menu-item-options/:id', [
          controllers.commerce.MenuItemOptions,
          'destroy',
        ])
        .as('menuItemOptions.destroy')
        .use([middleware.auth(), middleware.admin()]);
    })
    .as('catalog');
}
