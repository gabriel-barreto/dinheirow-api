import { makeCreateUserController } from './Create'
import {
  expressRouterInjector,
  Route
} from '@/Shared/Decorators/expressRouterInjector.decorator'

const namespace = '/user'
const routes: Route[] = [
  {
    method: 'POST',
    slug: '/',
    controller: makeCreateUserController(),
    name: 'Create User'
  }
]

export default expressRouterInjector({ namespace, routes })
