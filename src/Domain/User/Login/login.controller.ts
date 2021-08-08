import { Responses } from '@/Shared/Helpers'
import { Controller, HttpReq, HttpRes, Validator } from '@/Shared/Protocols'

import { ILoginService } from './loginService.protocol'

type Dependencies = { login: ILoginService; validator: Validator }

export class LoginController implements Controller {
  private login: ILoginService
  private validator: Validator

  constructor({ login, validator }: Dependencies) {
    this.login = login
    this.validator = validator
  }

  async handle(request: HttpReq<Record<string, any>>): Promise<HttpRes> {
    await this.validator.validate(request.body)
    const { email, password } = request.body
    const token = await this.login.execute({ email, password })
    return Responses.ok({ token: token.value })
  }
}
