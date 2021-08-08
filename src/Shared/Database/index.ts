import { TypeORM } from './typeORM'

export class DB {
  public static async connect() {
    return await Promise.all([TypeORM.connect()])
  }
}
