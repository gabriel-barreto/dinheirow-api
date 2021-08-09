import { Profile } from '@/Shared/Models'

export type Input = { username: string; loggedInUserId?: string }
export type Output = Profile

export interface IGetProfileService {
  execute(input: Input): Promise<Output>
}
