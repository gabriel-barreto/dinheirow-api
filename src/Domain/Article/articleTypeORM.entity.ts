import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

import { typeORMTransformers } from '@/Shared/Utils'

import { User } from '@/Domain/User/userTypeORM.entity'

@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  @Index()
  slug: string

  @Column()
  title: string

  @Column()
  description: string

  @Column({ name: 'body', type: 'text' })
  body: string

  @Column({
    name: 'tag_list',
    transformer: typeORMTransformers.list,
    type: 'text'
  })
  tagList: string[]

  @Column({ name: 'author_id', type: 'uuid' })
  @Index()
  authorId: string

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn({ name: 'author_id' })
  author: User

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone'
  })
  createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp with time zone'
  })
  updatedAt: Date
}
