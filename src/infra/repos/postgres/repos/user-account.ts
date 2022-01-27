import { PgUser } from '@/infra/repos/postgres/entities'
import { PgConnection } from '@/infra/repos/postgres/helpers'
import { LoadUserAccount, SaveFacebookAccount } from '@/domain/contracts/repos'

type LoadInput = LoadUserAccount.Input
type LoadOutput = LoadUserAccount.Output

type saveInput = SaveFacebookAccount.Input
type saveOutput = SaveFacebookAccount.Output

export class PgAccountUserRepository implements LoadUserAccount, SaveFacebookAccount {
  constructor (private readonly connection: PgConnection = PgConnection.getInstance()) {}

  async load ({ email }: LoadInput): Promise<LoadOutput> {
    const pgUserRepo = this.connection.getRepository(PgUser)
    const pgUser = await pgUserRepo.findOne({ email })
    if (pgUser !== undefined) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name ?? undefined
      }
    }
  }

  async saveWithFacebook ({ id, name, email, facebookId }: saveInput): Promise<saveOutput> {
    const pgUserRepo = this.connection.getRepository(PgUser)
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
