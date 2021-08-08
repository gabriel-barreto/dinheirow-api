import { AppError } from '@/Shared/Errors'
import { EncrypterProvider } from '@/Shared/Protocols/encrypter.protocol'
import { $errors } from '@/Shared/Utils'

import { CreateUserRepository } from './createUserRepository.protocol'
import { CreateUserService as ICreateUserService } from './createUserService.protocol'
import { Input } from './createUser.protocol'

type Dependencies = {
  encrypter: EncrypterProvider
  userRepo: CreateUserRepository
}

export class CreateUserService implements ICreateUserService {
  private encrypter: EncrypterProvider
  private userRepo: CreateUserRepository

  constructor({ encrypter, userRepo }: Dependencies) {
    this.encrypter = encrypter
    this.userRepo = userRepo
  }

  public async execute(input: Input) {
    const { email } = input
    const duplication = await this.userRepo.findOneByEmail(email)
    if (duplication) throw new AppError($errors.duplicated, { email })
    const { password: rawPasswd, username } = input
    const ePasswd = await this.encrypter.hash(rawPasswd)
    const userPayload = { email, password: ePasswd, username }
    const newUser = await this.userRepo.insertOne(userPayload)
    return newUser
  }
}
