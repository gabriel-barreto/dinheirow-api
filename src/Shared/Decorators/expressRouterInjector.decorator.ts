import { Express, Router } from 'express'

import { ExpressHandlerAdapter } from '@/Shared/Adapters'
import { Controller } from '@/Shared/Protocols'

export type Route = {
  name: string
  controller: Controller
  slug: string
  method: 'DELETE' | 'GET' | 'POST' | 'PUT'
}
type Routes = Route[]
type Params = { namespace: string; routes: Routes }

export function expressRouterInjector({ routes, namespace }: Params) {
  return function inject(app: Express) {
    const router = Router()
    routes.forEach(({ controller, method, name, slug }) => {
      console.log(`${method.toUpperCase()} - ${namespace}${slug} - ${name}`)
      const routerMethod = router[method.toLowerCase()].bind(router)
      routerMethod(slug, ExpressHandlerAdapter.adapt(controller))
    })
    app.use(namespace, router)
  }
}
