import { compare, hash } from 'bcrypt'

import { EncrypterProvider } from '@/Shared/Protocols/encrypter.protocol'

type Config = { rounds: number }
type Dependencies = { config: Config }

export class Encrypter implements EncrypterProvider {
  private config: Config

  constructor({ config }: Dependencies) {
    this.config = config
  }

  public async verify(encrypted: string, raw: string): Promise<boolean> {
    const isValid = await compare(raw, encrypted)
    return isValid
  }

  public async hash(data: string): Promise<string> {
    const hashed = await hash(data, this.config.rounds)
    return hashed
  }
}
