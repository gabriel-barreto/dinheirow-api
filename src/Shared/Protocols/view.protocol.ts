export interface View<T = Record<string, any>, K = Record<string, any>> {
  transformOne(payload: T): K
  transformMany(payload: T[]): K[]
  transform(payload: T | T[]): K | K[]
}
