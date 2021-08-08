type User = { id: string; email: string; password: string }

export interface LoginUserRepository {
  findOneByEmail(email: string): Promise<User | null>
}
