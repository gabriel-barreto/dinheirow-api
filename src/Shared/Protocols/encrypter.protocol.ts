export interface EncrypterProvider {
  hash(data: string): Promise<string>
  verify(encrypted: string, raw: string): Promise<boolean>
}
