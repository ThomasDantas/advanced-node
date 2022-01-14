import { LoadUserAccountRepository } from '@/data/contracts/repos'
import { SaveFacebookAccountRepository } from '@/data/contracts/repos/user-account'
import { PgUser } from '@/infra/postgres/entities'

import { getRepository } from 'typeorm'

type LoadParams = LoadUserAccountRepository.Params
type LoadResult = LoadUserAccountRepository.Result

type saveParams = SaveFacebookAccountRepository.Params
type saveResult = SaveFacebookAccountRepository.Result
export class PgAccountUserRepository implements LoadUserAccountRepository {
  private readonly pgUserRepo = getRepository(PgUser)

  async load ({ email }: LoadParams): Promise<LoadResult> {
    const pgUser = await this.pgUserRepo.findOne({ email })
    if (pgUser !== undefined) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name ?? undefined
      }
    }
  }

  async saveWithFacebook ({ id, name, email, facebookId }: saveParams): Promise<saveResult> {
    let resultId: string

    if (id === undefined) {
      const pgUser = await this.pgUserRepo.save({ email, name, facebookId })
      resultId = pgUser.id.toString()
    } else {
      await this.pgUserRepo.update({ id: parseInt(id) }, { name, facebookId })
      resultId = id
    }

    return { id: resultId }
  }
}
