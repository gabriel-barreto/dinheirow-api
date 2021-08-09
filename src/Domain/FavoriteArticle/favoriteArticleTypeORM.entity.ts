import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

import { Article } from '@/Domain/Article/articleTypeORM.entity'
import { User } from '@/Domain/User/userTypeORM.entity'

@Entity('favorite_articles')
export class FavoriteArticle {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'article_id', select: false, type: 'uuid' })
  articleId: string

  @Column({ name: 'user_id', select: false, type: 'uuid' })
  userId: string

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User

  @ManyToOne(() => Article, (article) => article.id)
  @JoinColumn({ name: 'article_id' })
  article: Article
}
