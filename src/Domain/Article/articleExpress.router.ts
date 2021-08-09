import {
  expressRouterInjector,
  Route
} from '@/Shared/Decorators/expressRouterInjector.decorator'
import { makeFeedController } from './Feed'

import { makeGetArticlesController } from './Get'

const namespace = '/articles'
const routes: Route[] = [
  {
    method: 'GET',
    slug: '/feed',
    controller: makeFeedController(),
    name: 'Get Articles'
  },
  {
    method: 'GET',
    slug: '/',
    controller: makeGetArticlesController(),
    name: 'Get Articles'
  }
]

export default expressRouterInjector({ namespace, routes })
