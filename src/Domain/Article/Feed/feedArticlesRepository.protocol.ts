import { Article, User } from '@/Shared/Models'

export type Input = { authorsId: string[]; limit: number; offset: number }

type LocalArticle = Omit<Article, 'author' | 'favorited' | 'favoritesCount'> & {
  id: string
  author: User
}
export type Output = LocalArticle[]

export interface FeedArticlesRepository {
  getByAuthors(input: Input): Promise<Output>
}
