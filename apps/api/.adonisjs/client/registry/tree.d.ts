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
}
