import { withAuth } from '../Authenticate/authenticateDecorator.factory'
import { UserTypeORMRepository } from '../userTypeORM.repository'
import { UpdateCurrentController } from './updateCurrent.controller'
import { UpdateCurrentService } from './updateCurrent.service'
import { UpdateCurrentUserYupValidator } from './updateUser.validator'

export function makeUpdateCurrentUserController() {
  const validator = new UpdateCurrentUserYupValidator()
  const userRepo = new UserTypeORMRepository()
  const updateCurrent = new UpdateCurrentService({ userRepo })
  const updateCurrentController = new UpdateCurrentController({
    updateCurrent,
    validator
  })
  return withAuth(updateCurrentController)
}
