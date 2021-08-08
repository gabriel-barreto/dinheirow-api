export type HttpReq<Body = Record<string, any>> = { body: Body }
export type HttpRes<Body = Record<string, any>> = { status: number; body: Body }
