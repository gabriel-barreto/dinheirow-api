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

  public async execute({ email, username, password: rawPasswd }: Input) {
    const [emailDuplication, usernameDuplication] = await Promise.all([
      await this.userRepo.findOneByEmail(email),
      await this.userRepo.findOneByUsername(username)
    ])
    if (emailDuplication || usernameDuplication) {
      const duplications = {}
      if (emailDuplication) Object.assign(duplications, { email })
      if (usernameDuplication) Object.assign(duplications, { username })
      throw new AppError($errors.duplicated, duplications)
    }
    if (emailDuplication) throw new AppError($errors.duplicated, { email })
    const ePasswd = await this.encrypter.hash(rawPasswd)
    const userPayload = { email, password: ePasswd, username }
    const newUser = await this.userRepo.insertOne(userPayload)
    return newUser
  }
}
