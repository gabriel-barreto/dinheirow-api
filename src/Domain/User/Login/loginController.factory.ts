import { encrypter as encrypterConfig, jwt as jwtConfig } from '@/Config'

import { Controller } from '@/Shared/Protocols'
import { Encrypter, JWT } from '@/Shared/Providers'

import { UserTypeORMRepository } from '../userTypeORM.repository'
import { LoginController } from './login.controller'
import { Login } from './login.service'
import { LoginYupValidator } from './login.validator'

export function makeLoginController(): Controller {
  const encrypter = new Encrypter({ config: encrypterConfig })
  const jwt = new JWT({ config: jwtConfig })
  const userRepo = new UserTypeORMRepository()
  const login = new Login({ encrypter, jwt, userRepo })
  const validator = new LoginYupValidator()
  const loginController = new LoginController({ login, validator })
  return loginController
}
