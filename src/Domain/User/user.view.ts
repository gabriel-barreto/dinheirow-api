import { pick } from 'lodash'

import { View } from '@/Shared/Protocols'

import { User as UserTypeORM } from './userTypeORM.entity'

type User = { email: string; id?: string; username: string }
type Input = UserTypeORM
type Output = User

export class UserView implements View<Input, Output> {
  private returnedFields: string[]

  constructor(returnedFields: string[]) {
    this.returnedFields = returnedFields
  }

  transformOne(user) {
    return pick(user, this.returnedFields) as Output
  }

  transformMany(users) {
    return users.map(this.transformOne)
  }

  public transform(payload: Input): Output {
    if (Array.isArray(payload)) return this.transformMany(payload)
    return this.transformOne(payload)
  }
}
