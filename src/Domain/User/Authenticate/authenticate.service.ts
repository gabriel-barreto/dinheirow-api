import { AppError } from '@/Shared/Errors'
import { JWTProvider } from '@/Shared/Protocols'
import { $errors } from '@/Shared/Utils'

import {
  IAuthenticateService,
  Input,
  Output
} from './authenticateService.protocol'
import { AuthenticateUserRepository } from './authenticateUserRepository.protocol'

type Dependencies = { jwt: JWTProvider; userRepo: AuthenticateUserRepository }

export class Authenticate implements IAuthenticateService {
  private userRepo: AuthenticateUserRepository
  private jwt: JWTProvider

  constructor({ jwt, userRepo }: Dependencies) {
    this.jwt = jwt
    this.userRepo = userRepo
  }

  async execute(token: Input): Promise<Output> {
    const { id } = await this.jwt.verify(token.value)
    const user = await this.userRepo.findOneById(id)
    if (!user) throw new AppError($errors.invalidToken, { token })
    return user
  }
}
