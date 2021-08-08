import { CREATED, OK } from 'http-status'

export class Responses {
  public static created(body: Record<string, any>) {
    return { status: CREATED, body }
  }

  public static ok(body: Record<string, any>) {
    return { status: OK, body }
  }
}
