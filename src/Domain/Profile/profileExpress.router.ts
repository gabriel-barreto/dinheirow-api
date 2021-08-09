import {
  expressRouterInjector,
  Route
} from '@/Shared/Decorators/expressRouterInjector.decorator'

import { makeGetProfileController } from './Get'

const namespace = '/profiles'
const routes: Route[] = [
  {
    method: 'GET',
    slug: '/:username',
    controller: makeGetProfileController(),
    name: 'Get Profile'
  }
]

export default expressRouterInjector({ namespace, routes })
