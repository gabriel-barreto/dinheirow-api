import { Article, User } from '@/Shared/Models'

type Query = { tag?: string; author?: string; favorited?: string[] }
type LocalArticle = Omit<Article, 'author' | 'favorited' | 'favoritesCount'> & {
  id: string
  author: User
}

type Input = { query: Query; limit: number; offset: number }
type Output = LocalArticle[]

export interface GetArticlesRepository {
  find(input: Input): Promise<Output>
}
