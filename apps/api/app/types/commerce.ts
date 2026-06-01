export const RESTAURANT_STATUSES = {
  DRAFT: 'draft',
  OPEN: 'open',
  CLOSED: 'closed',
  SUSPENDED: 'suspended',
} as const;

export type RestaurantStatus =
  (typeof RESTAURANT_STATUSES)[keyof typeof RESTAURANT_STATUSES];

export const MENU_ITEM_TYPES = {
  PRODUCT: 'product',
  MEAL: 'meal',
  DRINK: 'drink',
  SIDE: 'side',
  DESSERT: 'dessert',
} as const;

export type MenuItemType =
  (typeof MENU_ITEM_TYPES)[keyof typeof MENU_ITEM_TYPES];

export const CART_STATUSES = {
  ACTIVE: 'active',
  CONVERTED: 'converted',
  ABANDONED: 'abandoned',
} as const;

export type CartStatus = (typeof CART_STATUSES)[keyof typeof CART_STATUSES];

export const FULFILLMENT_METHODS = {
  DELIVERY: 'delivery',
  PICKUP: 'pickup',
  DINE_IN: 'dine_in',
} as const;

export type FulfillmentMethod =
  (typeof FULFILLMENT_METHODS)[keyof typeof FULFILLMENT_METHODS];

export const ORDER_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  READY: 'ready',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
} as const;

export type OrderStatus = (typeof ORDER_STATUSES)[keyof typeof ORDER_STATUSES];

export const PAYMENT_PROVIDERS = {
  CASH: 'cash',
  STRIPE: 'stripe',
  PAYPAL: 'paypal',
  CARD_TERMINAL: 'card_terminal',
} as const;

export type PaymentProvider =
  (typeof PAYMENT_PROVIDERS)[keyof typeof PAYMENT_PROVIDERS];

export const PAYMENT_STATUSES = {
  PENDING: 'pending',
  AUTHORIZED: 'authorized',
  PAID: 'paid',
  FAILED: 'failed',
  REFUNDED: 'refunded',
} as const;

export type PaymentStatus =
  (typeof PAYMENT_STATUSES)[keyof typeof PAYMENT_STATUSES];
