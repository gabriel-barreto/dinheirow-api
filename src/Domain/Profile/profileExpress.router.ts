import {
  expressRouterInjector,
  Route
} from '@/Shared/Decorators/expressRouterInjector.decorator'

import { makeGetProfileController } from './Get'
import { makeFollowProfileController } from './Follow'

const namespace = '/profiles'
const routes: Route[] = [
  {
    method: 'GET',
    slug: '/:username',
    controller: makeGetProfileController(),
    name: 'Get Profile'
  },
  {
    method: 'POST',
    slug: '/:username/follow',
    controller: makeFollowProfileController(),
    name: 'Follow User'
  }
]

export default expressRouterInjector({ namespace, routes })
