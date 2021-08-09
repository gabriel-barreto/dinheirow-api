import { Article } from '@/Shared/Models'

export type Input = {
  tag?: string
  author?: string
  favorited?: string
  loggedInUserId?: string
  limit: number
  offset: number
}
export type Output = Article[]

export interface GetArticlesService {
  execute(input: Input): Promise<Output>
}
