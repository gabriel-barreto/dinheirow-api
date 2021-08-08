export interface Validator {
  validate(payload: Record<string, any>): Promise<void>
}
