import { PgUser } from '@/infra/repos/postgres/entities'
import { PgRepository } from '@/infra/repos/postgres/repos/repository'
import { LoadUserAccount, SaveFacebookAccount } from '@/domain/contracts/repos'

type LoadInput = LoadUserAccount.Input
type LoadOutput = LoadUserAccount.Output

type saveInput = SaveFacebookAccount.Input
type saveOutput = SaveFacebookAccount.Output

export class PgAccountUserRepository extends PgRepository implements LoadUserAccount, SaveFacebookAccount {
  async load ({ email }: LoadInput): Promise<LoadOutput> {
    const pgUserRepo = this.getRepository(PgUser)
    const pgUser = await pgUserRepo.findOne({ email })
    if (pgUser !== undefined) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name ?? undefined
      }
    }
  }

  async saveWithFacebook ({ id, name, email, facebookId }: saveInput): Promise<saveOutput> {
    const pgUserRepo = this.getRepository(PgUser)
    let resultId: string
    if (id === undefined) {
      const pgUser = await pgUserRepo.save({ email, name, facebookId })
      resultId = pgUser.id.toString()
    } else {
      resultId = id
      await pgUserRepo.update({ id: parseInt(id) }, { name, facebookId })
    }
    return { id: resultId }
  }
}
