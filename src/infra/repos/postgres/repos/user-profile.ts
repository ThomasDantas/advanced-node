import { PgUser } from '@/infra/repos/postgres/entities'
import { PgConnection } from '@/infra/repos/postgres/helpers'
import { LoadUserProfile, SaveUserPicture } from '@/domain/contracts/repos'

export class PgUserProfileRepository implements SaveUserPicture, LoadUserProfile {
  constructor (private readonly connection: PgConnection = PgConnection.getInstance()) {}

  async savePicture ({ id, pictureUrl, initials }: SaveUserPicture.Input): Promise<void> {
    const pgUserRepo = this.connection.getRepository(PgUser)
    await pgUserRepo.update({ id: parseInt(id) }, { pictureUrl, initials })
  }

  async load ({ id }: LoadUserProfile.Input): Promise<LoadUserProfile.Output> {
    const pgUserRepo = this.connection.getRepository(PgUser)
    const pgUser = await pgUserRepo.findOne({ id: parseInt(id) })
    if (pgUser !== undefined) return { name: pgUser.name ?? undefined }
  }
}
