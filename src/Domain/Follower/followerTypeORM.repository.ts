import { EntityRepository, Repository as _Repository } from 'typeorm'

import { getTypeORMCustomRepo } from '@/Shared/Utils'

import { GetProfileFollowerRepository } from '@/Domain/Profile/Get/getProfileFollowerRepository.protocol'
import { FollowFollowerRepository } from '@/Domain/Profile/Follow/followFollowerRepository.protocol'
import { UnfollowFollowerRepository } from '@/Domain/Profile/Unfollow/unfollowFollowerRepository.protocol'

import { Follower } from './followerTypeORM.entity'

type Input = { followedId: string; followerId: string }
type Output = { followedId: string; followerId: string; id: string }

interface FollowerRepo extends _Repository<Follower> {}

@EntityRepository(Follower)
class TypeORMRepo extends _Repository<Follower> implements FollowerRepo {}

export class FollowerTypeORMRepository
  implements
    GetProfileFollowerRepository,
    FollowFollowerRepository,
    UnfollowFollowerRepository
{
  private $getRepo: () => FollowerRepo

  constructor() {
    this.$getRepo = getTypeORMCustomRepo<FollowerRepo>(TypeORMRepo)
  }

  async unfollow(input: Input): Promise<void> {
    await this.$getRepo().delete(input)
  }

  async follow(input: Input): Promise<Output> {
    const repo = this.$getRepo()
    const created = await repo.create(input)
    await repo.save(created)
    return created
  }

  async isFollowing({
    followedId,
    followerId
  }: {
    followerId: string
    followedId: string
  }): Promise<boolean> {
    const where = { followedId, followerId }
    const found = await this.$getRepo().findOne({ where })
    return !!found
  }
}
