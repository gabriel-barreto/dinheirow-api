import jwt from 'jsonwebtoken'

import { jwt as $config } from '@/Config'
import { JWTConfig, JWTProvider } from '@/Shared/Protocols'

type TokenPayload = Record<string, any>

class JsonWebToken implements JWTProvider {
  constructor(private config: JWTConfig = $config) {}

  async verify(token: string) {
    try {
      const decoded = await jwt.verify(token, this.config.secret)
      return decoded as Record<string, any>
    } catch (_ex) {
      return {}
    }
  }

  async sign(payload: TokenPayload): Promise<string> {
    const token = await jwt.sign(payload, this.config.secret, {
      expiresIn: this.config.expiresIn
    })
    return token
  }
}

export class JWT implements JWTProvider {
  constructor(private $jwt = new JsonWebToken()) {}

  public async verify(token: string) {
    return await this.$jwt.verify(token)
  }

  public async sign(payload: Record<string, any>) {
    return await this.$jwt.sign(payload)
  }
}
