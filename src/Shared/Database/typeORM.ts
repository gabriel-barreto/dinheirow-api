import { createConnection } from 'typeorm'

export class TypeORM {
  public static async connect() {
    return await createConnection()
  }
}
