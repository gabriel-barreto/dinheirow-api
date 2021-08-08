import { Responses } from '@/Shared/Helpers/response.helper'
import {
  Controller,
  HttpReq,
  HttpRes,
  Validator,
  View
} from '@/Shared/Protocols'

import { CreateUserService } from './createUserService.protocol'

type Dependencies = {
  createUser: CreateUserService
  validator: Validator
  view: View
}

export class CreateUserController implements Controller {
  private createUser: CreateUserService
  private validator: Validator
  private view: View

  constructor({ createUser, validator, view }: Dependencies) {
    this.createUser = createUser
    this.validator = validator
    this.view = view
  }

  public async handle(request: HttpReq): Promise<HttpRes> {
    await this.validator.validate(request.body)
    const { email, password, username } = request.body
    const user = await this.createUser.execute({
      email,
      password,
      username
    })
    return Responses.created({ user: this.view.transform(user) })
  }
}
