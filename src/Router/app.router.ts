import { Router } from 'express'
import * as Sentry from '@sentry/node'

import { api as apiConfig } from '@/Config'
import { exceptionHandler } from '@/Shared/Middlewares'

import apiRouter from './api.router'

class AppRouter {
  public router = Router()

  constructor({ api, middlewares }) {
    this.setup({ api, middlewares })
  }

  private setup({ api, middlewares }) {
    middlewares.pre.map(middleware => this.router.use(middleware))
    this.router.use(api.slug, api.router)
    middlewares.pos.map(middleware => this.router.use(middleware))
  }
}

export default new AppRouter({
  api: { router: apiRouter, slug: apiConfig.slugs.api },
  middlewares: {
    pre: [Sentry.Handlers.requestHandler(), Sentry.Handlers.tracingHandler()],
    pos: [Sentry.Handlers.errorHandler(), exceptionHandler]
  }
}).router
