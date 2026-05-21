export const TOKEN_TYPES = {
  PASSWORD_RESET: 'PASSWORD_RESET',
  VERIFY_EMAIL: 'VERIFY_EMAIL',
} as const;

export type TokenType = keyof typeof TOKEN_TYPES;
