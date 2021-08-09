import { auth as config, jwt as jwtConfig } from '@/Config'
import { Controller } from '@/Shared/Protocols'
import { JWT } from '@/Shared/Providers'

import { UserTypeORMRepository } from '../userTypeORM.repository'

import { Authenticate } from './authenticate.service'
import { OptionalAuthDecorator } from './optionalAuth.decorator'

export function withOptionalAuth(controller: Controller): Controller {
  const jwt = new JWT({ config: jwtConfig })
  const userRepo = new UserTypeORMRepository()
  const authenticate = new Authenticate({ jwt, userRepo })
  const optionalAuthController = new OptionalAuthDecorator({
    authenticate,
    config,
    controller
  })
  return optionalAuthController
}
