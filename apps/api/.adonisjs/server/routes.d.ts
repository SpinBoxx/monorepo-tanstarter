import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.signup': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.email.verify': { paramsTuple?: []; params?: {} }
    'auth.email.verification.resend': { paramsTuple?: []; params?: {} }
    'auth.password.forgot': { paramsTuple?: []; params?: {} }
    'auth.password.reset': { paramsTuple?: []; params?: {} }
    'auth.admin': { paramsTuple?: []; params?: {} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'profile.logout': { paramsTuple?: []; params?: {} }
    'profile.update': { paramsTuple?: []; params?: {} }
    'profile.list': { paramsTuple?: []; params?: {} }
    'profile.delete': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.restaurants.index': { paramsTuple?: []; params?: {} }
    'catalog.restaurants.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.restaurants.store': { paramsTuple?: []; params?: {} }
    'catalog.restaurants.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.restaurants.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.restaurants.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.productCategories.index': { paramsTuple?: []; params?: {} }
    'catalog.productCategories.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.productCategories.store': { paramsTuple?: []; params?: {} }
    'catalog.productCategories.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.productCategories.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.productCategories.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.menuItems.index': { paramsTuple?: []; params?: {} }
    'catalog.menuItems.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.menuItems.store': { paramsTuple?: []; params?: {} }
    'catalog.menuItems.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.menuItems.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.menuItems.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.menuItemVariants.index': { paramsTuple?: []; params?: {} }
    'catalog.menuItemVariants.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.menuItemVariants.store': { paramsTuple?: []; params?: {} }
    'catalog.menuItemVariants.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.menuItemVariants.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.menuItemVariants.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.menuItemOptionGroups.index': { paramsTuple?: []; params?: {} }
    'catalog.menuItemOptionGroups.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.menuItemOptionGroups.store': { paramsTuple?: []; params?: {} }
    'catalog.menuItemOptionGroups.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.menuItemOptionGroups.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.menuItemOptionGroups.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.menuItemOptions.index': { paramsTuple?: []; params?: {} }
    'catalog.menuItemOptions.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.menuItemOptions.store': { paramsTuple?: []; params?: {} }
    'catalog.menuItemOptions.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.menuItemOptions.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.menuItemOptions.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'favorites.index': { paramsTuple?: []; params?: {} }
    'favorites.store': { paramsTuple?: []; params?: {} }
    'favorites.destroy': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'auth.admin': { paramsTuple?: []; params?: {} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'profile.list': { paramsTuple?: []; params?: {} }
    'catalog.restaurants.index': { paramsTuple?: []; params?: {} }
    'catalog.restaurants.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.productCategories.index': { paramsTuple?: []; params?: {} }
    'catalog.productCategories.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.menuItems.index': { paramsTuple?: []; params?: {} }
    'catalog.menuItems.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.menuItemVariants.index': { paramsTuple?: []; params?: {} }
    'catalog.menuItemVariants.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.menuItemOptionGroups.index': { paramsTuple?: []; params?: {} }
    'catalog.menuItemOptionGroups.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.menuItemOptions.index': { paramsTuple?: []; params?: {} }
    'catalog.menuItemOptions.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'favorites.index': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'auth.admin': { paramsTuple?: []; params?: {} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'profile.list': { paramsTuple?: []; params?: {} }
    'catalog.restaurants.index': { paramsTuple?: []; params?: {} }
    'catalog.restaurants.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.productCategories.index': { paramsTuple?: []; params?: {} }
    'catalog.productCategories.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.menuItems.index': { paramsTuple?: []; params?: {} }
    'catalog.menuItems.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.menuItemVariants.index': { paramsTuple?: []; params?: {} }
    'catalog.menuItemVariants.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.menuItemOptionGroups.index': { paramsTuple?: []; params?: {} }
    'catalog.menuItemOptionGroups.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.menuItemOptions.index': { paramsTuple?: []; params?: {} }
    'catalog.menuItemOptions.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'favorites.index': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.signup': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.email.verify': { paramsTuple?: []; params?: {} }
    'auth.email.verification.resend': { paramsTuple?: []; params?: {} }
    'auth.password.forgot': { paramsTuple?: []; params?: {} }
    'auth.password.reset': { paramsTuple?: []; params?: {} }
    'profile.logout': { paramsTuple?: []; params?: {} }
    'profile.update': { paramsTuple?: []; params?: {} }
    'catalog.restaurants.store': { paramsTuple?: []; params?: {} }
    'catalog.productCategories.store': { paramsTuple?: []; params?: {} }
    'catalog.menuItems.store': { paramsTuple?: []; params?: {} }
    'catalog.menuItemVariants.store': { paramsTuple?: []; params?: {} }
    'catalog.menuItemOptionGroups.store': { paramsTuple?: []; params?: {} }
    'catalog.menuItemOptions.store': { paramsTuple?: []; params?: {} }
    'favorites.store': { paramsTuple?: []; params?: {} }
  }
  DELETE: {
    'profile.delete': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.restaurants.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.productCategories.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.menuItems.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.menuItemVariants.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.menuItemOptionGroups.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.menuItemOptions.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'favorites.destroy': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'catalog.restaurants.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.productCategories.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.menuItems.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.menuItemVariants.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.menuItemOptionGroups.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.menuItemOptions.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'catalog.restaurants.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.productCategories.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.menuItems.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.menuItemVariants.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.menuItemOptionGroups.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.menuItemOptions.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}