import { Profile } from '@/Shared/Models'

export type Input = { username: string; loggedInUserId: string }
export type Output = Profile

export interface IUnfollowProfileService {
  execute(input: Input): Promise<Output>
}
