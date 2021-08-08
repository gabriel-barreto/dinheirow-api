import {
  expressRouterInjector,
  Route
} from '@/Shared/Decorators/expressRouterInjector.decorator'

import { makeCreateUserController } from './Create'
import { makeCurrentUserController } from './Current'
import { makeLoginController } from './Login'
import { makeUpdateCurrentUserController } from './UpdateCurrent/updateCurrentController.factory'

const namespace = '/user'
const routes: Route[] = [
  {
    method: 'POST',
    slug: '/',
    controller: makeCreateUserController(),
    name: 'Create User'
  },
  {
    method: 'GET',
    slug: '/',
    controller: makeCurrentUserController(),
    name: 'Current User'
  },
  {
    method: 'PUT',
    slug: '/',
    controller: makeUpdateCurrentUserController(),
    name: 'Update Current User'
  },
  {
    method: 'POST',
    slug: '/login',
    controller: makeLoginController(),
    name: 'Login'
  }
]

export default expressRouterInjector({ namespace, routes })
