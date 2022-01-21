import { LoadUserAccount, SaveFacebookAccount } from '@/domain/contracts/repos'
import { PgUser } from '@/infra/repos/postgres/entities'

import { getRepository } from 'typeorm'

type LoadInput = LoadUserAccount.Input
type LoadOutput = LoadUserAccount.Output

type saveInput = SaveFacebookAccount.Input
type saveOutput = SaveFacebookAccount.Output
export class PgAccountUserRepository implements LoadUserAccount {
  async load ({ email }: LoadInput): Promise<LoadOutput> {
    const pgUserRepo = getRepository(PgUser)
    const pgUser = await pgUserRepo.findOne({ email })
    if (pgUser !== undefined) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name ?? undefined
      }
    }
  }

  async saveWithFacebook ({ id, name, email, facebookId }: saveInput): Promise<saveOutput> {
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
