import { EntityRepository, Repository as _Repository } from 'typeorm'

import { getTypeORMCustomRepo } from '@/Shared/Utils'

import { GetProfileFollowerRepository } from '@/Domain/Profile/Get/getProfileFollowerRepository.protocol'

import { Follower } from './followerTypeORM.entity'

interface FollowerRepo extends _Repository<Follower> {}

@EntityRepository(Follower)
class TypeORMRepo extends _Repository<Follower> implements FollowerRepo {}

export class FollowerTypeORMRepository implements GetProfileFollowerRepository {
  private $getRepo: () => FollowerRepo

  constructor() {
    this.$getRepo = getTypeORMCustomRepo<FollowerRepo>(TypeORMRepo)
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
