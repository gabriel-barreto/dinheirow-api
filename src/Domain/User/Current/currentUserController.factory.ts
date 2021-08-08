import { Controller } from '@/Shared/Protocols'

import { withAuth } from '../Authenticate/authenticateDecorator.factory'
import { UserView } from '../user.view'
import { CurrentUserController } from './currentUser.controller'

export function makeCurrentUserController(): Controller {
  const view = new UserView(['bio', 'email', 'id', 'image', 'username'])
  const currentUserController = new CurrentUserController({ view })
  return withAuth(currentUserController)
}
