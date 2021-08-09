import { Token } from '@/Shared/Models'
import { AuthHttpReq, Controller, HttpReq, HttpRes } from '@/Shared/Protocols'

import { AppError } from '@/Shared/Errors'
import { $errors } from '@/Shared/Utils'
import { IAuthenticateService } from './authenticateService.protocol'

type Config = { enabled: boolean; header: string; prefix: string }
type Params = {
  authenticate: IAuthenticateService
  config: Config
  controller: Controller
}

export class OptionalAuthDecorator implements Controller {
  private config: Config
  private controller: Controller
  private authenticate: IAuthenticateService

  constructor({ authenticate, config, controller }: Params) {
    this.controller = controller
    this.config = config
    this.authenticate = authenticate
  }

  async handle(request: HttpReq): Promise<HttpRes> {
    const header = request.headers[this.config.header]
    if (!header) return this.controller.handle(request)
    const [_, rawToken] = header.split(this.config.prefix).map((e) => e.trim())
    if (!rawToken) throw new AppError($errors.invalidToken)
    const token = new Token({ token: rawToken })
    const authenticatedUser = await this.authenticate.execute(token)
    const req: AuthHttpReq = { ...request, user: authenticatedUser }
    return this.controller.handle(req)
  }
}
