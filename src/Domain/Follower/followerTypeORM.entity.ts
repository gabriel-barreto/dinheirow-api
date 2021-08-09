import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity('followers')
export class Follower {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'follower_id', type: 'uuid' })
  followerId: string

  @Column({ name: 'followed_id', type: 'uuid' })
  followedId: string

  @CreateDateColumn({
    name: 'created_at',
    select: false,
    type: 'timestamp with time zone'
  })
  createdAt: Date
}
