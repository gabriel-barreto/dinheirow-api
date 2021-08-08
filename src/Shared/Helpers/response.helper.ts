import { CREATED } from 'http-status'

export class Responses {
  public static created(body: Record<string, any>) {
    return { status: CREATED, body }
  }
}
