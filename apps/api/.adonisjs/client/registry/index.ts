/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.signup': {
    methods: ["POST"],
    pattern: '/api/v1/auth/signup',
    tokens: [{"old":"/api/v1/auth/signup","type":0,"val":"api","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['auth.signup']['types'],
  },
  'auth.login': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [{"old":"/api/v1/auth/login","type":0,"val":"api","end":""},{"old":"/api/v1/auth/login","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/login","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.login']['types'],
  },
  'auth.email.verify': {
    methods: ["POST"],
    pattern: '/api/v1/auth/email/verify',
    tokens: [{"old":"/api/v1/auth/email/verify","type":0,"val":"api","end":""},{"old":"/api/v1/auth/email/verify","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/email/verify","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/email/verify","type":0,"val":"email","end":""},{"old":"/api/v1/auth/email/verify","type":0,"val":"verify","end":""}],
    types: placeholder as Registry['auth.email.verify']['types'],
  },
  'auth.email.verification.resend': {
    methods: ["POST"],
    pattern: '/api/v1/auth/email/verification/resend',
    tokens: [{"old":"/api/v1/auth/email/verification/resend","type":0,"val":"api","end":""},{"old":"/api/v1/auth/email/verification/resend","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/email/verification/resend","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/email/verification/resend","type":0,"val":"email","end":""},{"old":"/api/v1/auth/email/verification/resend","type":0,"val":"verification","end":""},{"old":"/api/v1/auth/email/verification/resend","type":0,"val":"resend","end":""}],
    types: placeholder as Registry['auth.email.verification.resend']['types'],
  },
  'auth.password.forgot': {
    methods: ["POST"],
    pattern: '/api/v1/auth/password/forgot',
    tokens: [{"old":"/api/v1/auth/password/forgot","type":0,"val":"api","end":""},{"old":"/api/v1/auth/password/forgot","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/password/forgot","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/password/forgot","type":0,"val":"password","end":""},{"old":"/api/v1/auth/password/forgot","type":0,"val":"forgot","end":""}],
    types: placeholder as Registry['auth.password.forgot']['types'],
  },
  'auth.password.reset': {
    methods: ["POST"],
    pattern: '/api/v1/auth/password/reset',
    tokens: [{"old":"/api/v1/auth/password/reset","type":0,"val":"api","end":""},{"old":"/api/v1/auth/password/reset","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/password/reset","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/password/reset","type":0,"val":"password","end":""},{"old":"/api/v1/auth/password/reset","type":0,"val":"reset","end":""}],
    types: placeholder as Registry['auth.password.reset']['types'],
  },
  'auth.admin': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/auth/admin',
    tokens: [{"old":"/api/v1/auth/admin","type":0,"val":"api","end":""},{"old":"/api/v1/auth/admin","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/admin","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/admin","type":0,"val":"admin","end":""}],
    types: placeholder as Registry['auth.admin']['types'],
  },
  'profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account/profile',
    tokens: [{"old":"/api/v1/account/profile","type":0,"val":"api","end":""},{"old":"/api/v1/account/profile","type":0,"val":"v1","end":""},{"old":"/api/v1/account/profile","type":0,"val":"account","end":""},{"old":"/api/v1/account/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.show']['types'],
  },
  'profile.logout': {
    methods: ["POST"],
    pattern: '/api/v1/account/logout',
    tokens: [{"old":"/api/v1/account/logout","type":0,"val":"api","end":""},{"old":"/api/v1/account/logout","type":0,"val":"v1","end":""},{"old":"/api/v1/account/logout","type":0,"val":"account","end":""},{"old":"/api/v1/account/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['profile.logout']['types'],
  },
  'profile.update': {
    methods: ["POST"],
    pattern: '/api/v1/account/update',
    tokens: [{"old":"/api/v1/account/update","type":0,"val":"api","end":""},{"old":"/api/v1/account/update","type":0,"val":"v1","end":""},{"old":"/api/v1/account/update","type":0,"val":"account","end":""},{"old":"/api/v1/account/update","type":0,"val":"update","end":""}],
    types: placeholder as Registry['profile.update']['types'],
  },
  'profile.list': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account/list',
    tokens: [{"old":"/api/v1/account/list","type":0,"val":"api","end":""},{"old":"/api/v1/account/list","type":0,"val":"v1","end":""},{"old":"/api/v1/account/list","type":0,"val":"account","end":""},{"old":"/api/v1/account/list","type":0,"val":"list","end":""}],
    types: placeholder as Registry['profile.list']['types'],
  },
  'profile.delete': {
    methods: ["DELETE"],
    pattern: '/api/v1/account/delete/:id',
    tokens: [{"old":"/api/v1/account/delete/:id","type":0,"val":"api","end":""},{"old":"/api/v1/account/delete/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/account/delete/:id","type":0,"val":"account","end":""},{"old":"/api/v1/account/delete/:id","type":0,"val":"delete","end":""},{"old":"/api/v1/account/delete/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['profile.delete']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
