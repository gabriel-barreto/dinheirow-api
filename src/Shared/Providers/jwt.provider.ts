import jwt from 'jsonwebtoken'

import { Config, Input, JWTProvider } from '@/Shared/Protocols'
import { AppError } from '@/Shared/Errors'
import { $errors } from '@/Shared/Utils'

type Params = { config: Config }

export class JWT implements JWTProvider {
  private config: Config

  constructor({ config }) {
    this.config = config
  }

  async verify(token: string) {
    const decoded = await jwt.verify(token, this.config.secret)
    if (!decoded || typeof decoded === 'string') {
      throw new AppError($errors.invalidToken, { token })
    }
    return decoded as { email: string; id: string }
  }

  async sign(input: Input): Promise<string> {
    const token = await jwt.sign(input, this.config.secret, {
      expiresIn: this.config.expiresIn
    })
    return token
  }
}
