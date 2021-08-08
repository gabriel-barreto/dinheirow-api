import { auth as config, jwt as jwtConfig } from '@/Config'

import { Controller } from '@/Shared/Protocols'

import { Authenticate } from './authenticate.service'
import { AuthenticateDecorator } from './authenticate.decorator'
import { JWT } from '@/Shared/Providers'
import { UserTypeORMRepository } from '../userTypeORM.repository'

export function withAuth(controller: Controller): Controller {
  const jwt = new JWT({ config: jwtConfig })
  const userRepo = new UserTypeORMRepository()
  const authenticate = new Authenticate({ jwt, userRepo })
  const authController = new AuthenticateDecorator({
    authenticate,
    config,
    controller
  })
  return authController
}
