import {
  expressRouterInjector,
  Route
} from '@/Shared/Decorators/expressRouterInjector.decorator'

import { makeGetArticlesController } from './Get'

const namespace = '/articles'
const routes: Route[] = [
  {
    method: 'GET',
    slug: '/',
    controller: makeGetArticlesController(),
    name: 'Get Articles'
  }
]

export default expressRouterInjector({ namespace, routes })
