import { Controller } from '@/Shared/Protocols'
import { Encrypter } from '@/Shared/Providers'

import { UserTypeORMRepository } from '../userTypeORM.repository'

import { encrypter as encrypterConfig } from '@/Config'

import { CreateUserController } from './createUser.controller'
import { CreateUserService } from './createUser.service'
import { CreateUserYupValidator } from './createUser.validator'
import { UserView } from '../user.view'

export function makeCreateUserController(): Controller {
  const validator = new CreateUserYupValidator()
  const encrypter = new Encrypter({ config: encrypterConfig })
  const userRepo = new UserTypeORMRepository()
  const createUser = new CreateUserService({ encrypter, userRepo })
  const view = new UserView(['email', 'id', 'username'])
  const createUserController = new CreateUserController({
    createUser,
    validator,
    view
  })
  return createUserController
}
