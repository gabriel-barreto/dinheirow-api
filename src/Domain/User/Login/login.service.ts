import { AppError } from '@/Shared/Errors'
import { Token } from '@/Shared/Models'
import { Encrypter, JWT } from '@/Shared/Providers'
import { $errors } from '@/Shared/Utils'

import { LoginUserRepository } from './loginRepository.protocol'
import { ILoginService, Input } from './loginService.protocol'

type Dependencies = {
  encrypter: Encrypter
  jwt: JWT
  userRepo: LoginUserRepository
}

export class Login implements ILoginService {
  private encrypter: Encrypter
  private jwt: JWT
  private userRepo: LoginUserRepository

  constructor({ encrypter, jwt, userRepo }: Dependencies) {
    this.encrypter = encrypter
    this.jwt = jwt
    this.userRepo = userRepo
  }

  async execute(input: Input): Promise<Token> {
    const { email, password: rawPasswd } = input
    const user = await this.userRepo.findOneByEmail(email)
    if (!user) throw new AppError($errors.notFound, { email })
    const { id, password: ePasswd } = user
    const isPasswdValid = await this.encrypter.verify(ePasswd, rawPasswd)
    if (!isPasswdValid) throw new AppError($errors.invalidPassword)
    const token = await this.jwt.sign({ email, id })
    return new Token({ token })
  }
}
