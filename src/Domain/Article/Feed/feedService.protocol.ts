import { Article } from '@/Shared/Models'

export type Input = {
  loggedInUserId: string
  limit?: number
  offset?: number
}
export type Output = Article[]

export interface FeedService {
  execute(input: Input): Promise<Output>
}
