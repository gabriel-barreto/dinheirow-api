import jwt from 'jsonwebtoken'

import { Config, Input, JWTProvider } from '@/Shared/Protocols'

type Params = { config: Config }

export class JWT implements JWTProvider {
  private config: Config

  constructor({ config }) {
    this.config = config
  }

  async verify(token: string) {
    try {
      const decoded = await jwt.verify(token, this.config.secret)
      return decoded as Record<string, any>
    } catch (_ex) {
      return {}
    }
  }

  async sign(input: Input): Promise<string> {
    const token = await jwt.sign(input, this.config.secret, {
      expiresIn: this.config.expiresIn
    })
    return token
  }
}
