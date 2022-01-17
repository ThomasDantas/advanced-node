import { LoadUserAccountRepository } from '@/domain/contracts/repos'
import { SaveFacebookAccountRepository } from '@/domain/contracts/repos/user-account'
import { PgUser } from '@/infra/postgres/entities'

import { getRepository } from 'typeorm'

type LoadParams = LoadUserAccountRepository.Params
type LoadResult = LoadUserAccountRepository.Result

type saveParams = SaveFacebookAccountRepository.Params
type saveResult = SaveFacebookAccountRepository.Result
export class PgAccountUserRepository implements LoadUserAccountRepository {
  async load ({ email }: LoadParams): Promise<LoadResult> {
    const pgUserRepo = getRepository(PgUser)
    const pgUser = await pgUserRepo.findOne({ email })
    if (pgUser !== undefined) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name ?? undefined
      }
    }
  }

  async saveWithFacebook ({ id, name, email, facebookId }: saveParams): Promise<saveResult> {
    const pgUserRepo = getRepository(PgUser)
    let resultId: string

    if (id === undefined) {
      const pgUser = await pgUserRepo.save({ email, name, facebookId })
      resultId = pgUser.id.toString()
    } else {
      await pgUserRepo.update({ id: parseInt(id) }, { name, facebookId })
      resultId = id
    }

    return { id: resultId }
  }
}
