import { Router } from 'express'
import { resolve } from 'path'
import fg from 'fast-glob'

class ApiRouter {
  public router = Router()

  constructor() {
    this.setup()
  }

  public async setup() {
    const domainFolder = resolve(__dirname, '..', 'Domain')
    const injectors = await fg(`${domainFolder}/**/*Express.router.ts`)
    injectors.forEach(async injector => {
      const { default: inject } = await import(injector)
      inject(this.router)
    })
  }
}

export default new ApiRouter().router
