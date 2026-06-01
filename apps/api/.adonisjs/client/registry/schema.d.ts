/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'auth.signup': {
    methods: ["POST"]
    pattern: '/api/v1/auth/signup'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/auth/signup.validator').signupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/auth/signup.validator').signupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/new-account-controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/new-account-controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.login': {
    methods: ["POST"]
    pattern: '/api/v1/auth/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/auth/login.validator').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/auth/login.validator').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/access-tokens-controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/access-tokens-controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.email.verify': {
    methods: ["POST"]
    pattern: '/api/v1/auth/email/verify'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/auth/verify-email.validator').verifyEmailValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/auth/verify-email.validator').verifyEmailValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/email-verification-controller').default['verify']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/email-verification-controller').default['verify']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.email.verification.resend': {
    methods: ["POST"]
    pattern: '/api/v1/auth/email/verification/resend'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/auth/verify-email.validator').resendVerificationEmailValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/auth/verify-email.validator').resendVerificationEmailValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/email-verification-controller').default['resend']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/email-verification-controller').default['resend']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.password.forgot': {
    methods: ["POST"]
    pattern: '/api/v1/auth/password/forgot'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/auth/reset-password.validator').forgotPasswordValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/auth/reset-password.validator').forgotPasswordValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/password-reset-controller').default['request']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/password-reset-controller').default['request']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.password.reset': {
    methods: ["POST"]
    pattern: '/api/v1/auth/password/reset'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/auth/reset-password.validator').resetPasswordValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/auth/reset-password.validator').resetPasswordValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/password-reset-controller').default['reset']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/password-reset-controller').default['reset']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.admin': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/auth/admin'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'profile.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/account/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/user/user-controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/user/user-controller').default['show']>>>
    }
  }
  'profile.logout': {
    methods: ["POST"]
    pattern: '/api/v1/account/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/access-tokens-controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/access-tokens-controller').default['destroy']>>>
    }
  }
  'profile.update': {
    methods: ["POST"]
    pattern: '/api/v1/account/update'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user/update-user.validator').updateUserValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user/update-user.validator').updateUserValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/user/user-controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/user/user-controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'profile.list': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/account/list'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/user/list-user.validator').listUserValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/user/user-controller').default['list']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/user/user-controller').default['list']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'profile.delete': {
    methods: ["DELETE"]
    pattern: '/api/v1/account/delete/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/user/user-controller').default['delete']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/user/user-controller').default['delete']>>>
    }
  }
  'catalog.restaurants.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/restaurants'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/commerce/catalog.validator').listCatalogValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commerce/restaurants_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commerce/restaurants_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'catalog.restaurants.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/restaurants/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commerce/restaurants_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commerce/restaurants_controller').default['show']>>>
    }
  }
  'catalog.restaurants.store': {
    methods: ["POST"]
    pattern: '/api/v1/restaurants'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/commerce/catalog.validator').createRestaurantValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/commerce/catalog.validator').createRestaurantValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commerce/restaurants_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commerce/restaurants_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'catalog.restaurants.update': {
    methods: ["PUT"]
    pattern: '/api/v1/restaurants/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/commerce/catalog.validator').updateRestaurantValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/commerce/catalog.validator').updateRestaurantValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commerce/restaurants_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commerce/restaurants_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'catalog.restaurants.patch': {
    methods: ["PATCH"]
    pattern: '/api/v1/restaurants/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/commerce/catalog.validator').updateRestaurantValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/commerce/catalog.validator').updateRestaurantValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commerce/restaurants_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commerce/restaurants_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'catalog.restaurants.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/restaurants/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commerce/restaurants_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commerce/restaurants_controller').default['destroy']>>>
    }
  }
  'catalog.productCategories.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/product-categories'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/commerce/catalog.validator').listCatalogValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commerce/product_categories_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commerce/product_categories_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'catalog.productCategories.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/product-categories/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commerce/product_categories_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commerce/product_categories_controller').default['show']>>>
    }
  }
  'catalog.productCategories.store': {
    methods: ["POST"]
    pattern: '/api/v1/product-categories'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/commerce/catalog.validator').createProductCategoryValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/commerce/catalog.validator').createProductCategoryValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commerce/product_categories_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commerce/product_categories_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'catalog.productCategories.update': {
    methods: ["PUT"]
    pattern: '/api/v1/product-categories/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/commerce/catalog.validator').updateProductCategoryValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/commerce/catalog.validator').updateProductCategoryValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commerce/product_categories_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commerce/product_categories_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'catalog.productCategories.patch': {
    methods: ["PATCH"]
    pattern: '/api/v1/product-categories/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/commerce/catalog.validator').updateProductCategoryValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/commerce/catalog.validator').updateProductCategoryValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commerce/product_categories_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commerce/product_categories_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'catalog.productCategories.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/product-categories/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commerce/product_categories_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commerce/product_categories_controller').default['destroy']>>>
    }
  }
  'catalog.menuItems.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/menu-items'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/commerce/catalog.validator').listCatalogValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commerce/menu_items_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commerce/menu_items_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'catalog.menuItems.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/menu-items/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commerce/menu_items_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commerce/menu_items_controller').default['show']>>>
    }
  }
  'catalog.menuItems.store': {
    methods: ["POST"]
    pattern: '/api/v1/menu-items'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/commerce/catalog.validator').createMenuItemValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/commerce/catalog.validator').createMenuItemValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commerce/menu_items_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commerce/menu_items_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'catalog.menuItems.update': {
    methods: ["PUT"]
    pattern: '/api/v1/menu-items/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/commerce/catalog.validator').updateMenuItemValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/commerce/catalog.validator').updateMenuItemValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commerce/menu_items_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commerce/menu_items_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'catalog.menuItems.patch': {
    methods: ["PATCH"]
    pattern: '/api/v1/menu-items/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/commerce/catalog.validator').updateMenuItemValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/commerce/catalog.validator').updateMenuItemValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commerce/menu_items_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commerce/menu_items_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'catalog.menuItems.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/menu-items/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commerce/menu_items_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commerce/menu_items_controller').default['destroy']>>>
    }
  }
  'catalog.menuItemVariants.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/menu-item-variants'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/commerce/catalog.validator').listCatalogValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commerce/menu_item_variants_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commerce/menu_item_variants_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'catalog.menuItemVariants.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/menu-item-variants/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commerce/menu_item_variants_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commerce/menu_item_variants_controller').default['show']>>>
    }
  }
  'catalog.menuItemVariants.store': {
    methods: ["POST"]
    pattern: '/api/v1/menu-item-variants'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/commerce/catalog.validator').createMenuItemVariantValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/commerce/catalog.validator').createMenuItemVariantValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commerce/menu_item_variants_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commerce/menu_item_variants_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'catalog.menuItemVariants.update': {
    methods: ["PUT"]
    pattern: '/api/v1/menu-item-variants/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/commerce/catalog.validator').updateMenuItemVariantValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/commerce/catalog.validator').updateMenuItemVariantValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commerce/menu_item_variants_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commerce/menu_item_variants_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'catalog.menuItemVariants.patch': {
    methods: ["PATCH"]
    pattern: '/api/v1/menu-item-variants/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/commerce/catalog.validator').updateMenuItemVariantValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/commerce/catalog.validator').updateMenuItemVariantValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commerce/menu_item_variants_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commerce/menu_item_variants_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'catalog.menuItemVariants.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/menu-item-variants/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commerce/menu_item_variants_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commerce/menu_item_variants_controller').default['destroy']>>>
    }
  }
  'catalog.menuItemOptionGroups.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/menu-item-option-groups'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/commerce/catalog.validator').listCatalogValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commerce/menu_item_option_groups_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commerce/menu_item_option_groups_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'catalog.menuItemOptionGroups.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/menu-item-option-groups/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commerce/menu_item_option_groups_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commerce/menu_item_option_groups_controller').default['show']>>>
    }
  }
  'catalog.menuItemOptionGroups.store': {
    methods: ["POST"]
    pattern: '/api/v1/menu-item-option-groups'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/commerce/catalog.validator').createMenuItemOptionGroupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/commerce/catalog.validator').createMenuItemOptionGroupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commerce/menu_item_option_groups_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commerce/menu_item_option_groups_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'catalog.menuItemOptionGroups.update': {
    methods: ["PUT"]
    pattern: '/api/v1/menu-item-option-groups/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/commerce/catalog.validator').updateMenuItemOptionGroupValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/commerce/catalog.validator').updateMenuItemOptionGroupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commerce/menu_item_option_groups_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commerce/menu_item_option_groups_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'catalog.menuItemOptionGroups.patch': {
    methods: ["PATCH"]
    pattern: '/api/v1/menu-item-option-groups/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/commerce/catalog.validator').updateMenuItemOptionGroupValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/commerce/catalog.validator').updateMenuItemOptionGroupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commerce/menu_item_option_groups_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commerce/menu_item_option_groups_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'catalog.menuItemOptionGroups.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/menu-item-option-groups/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commerce/menu_item_option_groups_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commerce/menu_item_option_groups_controller').default['destroy']>>>
    }
  }
  'catalog.menuItemOptions.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/menu-item-options'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/commerce/catalog.validator').listCatalogValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commerce/menu_item_options_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commerce/menu_item_options_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'catalog.menuItemOptions.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/menu-item-options/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commerce/menu_item_options_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commerce/menu_item_options_controller').default['show']>>>
    }
  }
  'catalog.menuItemOptions.store': {
    methods: ["POST"]
    pattern: '/api/v1/menu-item-options'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/commerce/catalog.validator').createMenuItemOptionValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/commerce/catalog.validator').createMenuItemOptionValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commerce/menu_item_options_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commerce/menu_item_options_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'catalog.menuItemOptions.update': {
    methods: ["PUT"]
    pattern: '/api/v1/menu-item-options/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/commerce/catalog.validator').updateMenuItemOptionValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/commerce/catalog.validator').updateMenuItemOptionValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commerce/menu_item_options_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commerce/menu_item_options_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'catalog.menuItemOptions.patch': {
    methods: ["PATCH"]
    pattern: '/api/v1/menu-item-options/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/commerce/catalog.validator').updateMenuItemOptionValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/commerce/catalog.validator').updateMenuItemOptionValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commerce/menu_item_options_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commerce/menu_item_options_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'catalog.menuItemOptions.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/menu-item-options/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/commerce/menu_item_options_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/commerce/menu_item_options_controller').default['destroy']>>>
    }
  }
  'favorites.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/favorites'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/favorite/favorite.validator').listFavoritesValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/favorites/favorites_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/favorites/favorites_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'favorites.store': {
    methods: ["POST"]
    pattern: '/api/v1/favorites'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/favorite/favorite.validator').createFavoriteValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/favorite/favorite.validator').createFavoriteValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/favorites/favorites_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/favorites/favorites_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'favorites.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/favorites'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/favorite/favorite.validator').deleteFavoriteValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/favorite/favorite.validator').deleteFavoriteValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/favorites/favorites_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/favorites/favorites_controller').default['destroy']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
}
