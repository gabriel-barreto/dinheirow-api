import { User } from '@/Shared/Models'

export type HttpReq<
  Body = Record<string, any>,
  Headers = Record<string, any>,
  Params = Record<string, any>,
  Query = Record<string, any>
> = { body: Body; headers: Headers; params: Params; query: Query }
export type AuthHttpReq = HttpReq & { user: User }
export type HttpRes<Body = Record<string, any>> = { status: number; body: Body }
