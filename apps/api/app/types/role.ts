export enum USER_ROLES {
  ADMIN = 'admin',
  USER = 'user',
}

export type UserRoleValue = (typeof USER_ROLES)[keyof typeof USER_ROLES];
export const DEFAULT_USER_ROLE: UserRoleValue = USER_ROLES.USER;
