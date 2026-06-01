/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    signup: typeof routes['auth.signup']
    login: typeof routes['auth.login']
    email: {
      verify: typeof routes['auth.email.verify']
      verification: {
        resend: typeof routes['auth.email.verification.resend']
      }
    }
    password: {
      forgot: typeof routes['auth.password.forgot']
      reset: typeof routes['auth.password.reset']
    }
    admin: typeof routes['auth.admin']
  }
  profile: {
    show: typeof routes['profile.show']
    logout: typeof routes['profile.logout']
    update: typeof routes['profile.update']
    list: typeof routes['profile.list']
    delete: typeof routes['profile.delete']
  }
  catalog: {
    restaurants: {
      index: typeof routes['catalog.restaurants.index']
      show: typeof routes['catalog.restaurants.show']
      store: typeof routes['catalog.restaurants.store']
      update: typeof routes['catalog.restaurants.update']
      patch: typeof routes['catalog.restaurants.patch']
      destroy: typeof routes['catalog.restaurants.destroy']
    }
    productCategories: {
      index: typeof routes['catalog.productCategories.index']
      show: typeof routes['catalog.productCategories.show']
      store: typeof routes['catalog.productCategories.store']
      update: typeof routes['catalog.productCategories.update']
      patch: typeof routes['catalog.productCategories.patch']
      destroy: typeof routes['catalog.productCategories.destroy']
    }
    menuItems: {
      index: typeof routes['catalog.menuItems.index']
      show: typeof routes['catalog.menuItems.show']
      store: typeof routes['catalog.menuItems.store']
      update: typeof routes['catalog.menuItems.update']
      patch: typeof routes['catalog.menuItems.patch']
      destroy: typeof routes['catalog.menuItems.destroy']
    }
    menuItemVariants: {
      index: typeof routes['catalog.menuItemVariants.index']
      show: typeof routes['catalog.menuItemVariants.show']
      store: typeof routes['catalog.menuItemVariants.store']
      update: typeof routes['catalog.menuItemVariants.update']
      patch: typeof routes['catalog.menuItemVariants.patch']
      destroy: typeof routes['catalog.menuItemVariants.destroy']
    }
    menuItemOptionGroups: {
      index: typeof routes['catalog.menuItemOptionGroups.index']
      show: typeof routes['catalog.menuItemOptionGroups.show']
      store: typeof routes['catalog.menuItemOptionGroups.store']
      update: typeof routes['catalog.menuItemOptionGroups.update']
      patch: typeof routes['catalog.menuItemOptionGroups.patch']
      destroy: typeof routes['catalog.menuItemOptionGroups.destroy']
    }
    menuItemOptions: {
      index: typeof routes['catalog.menuItemOptions.index']
      show: typeof routes['catalog.menuItemOptions.show']
      store: typeof routes['catalog.menuItemOptions.store']
      update: typeof routes['catalog.menuItemOptions.update']
      patch: typeof routes['catalog.menuItemOptions.patch']
      destroy: typeof routes['catalog.menuItemOptions.destroy']
    }
  }
  favorites: {
    index: typeof routes['favorites.index']
    store: typeof routes['favorites.store']
    destroy: typeof routes['favorites.destroy']
  }
}
