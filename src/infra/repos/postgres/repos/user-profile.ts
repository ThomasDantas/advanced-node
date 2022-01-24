import { SaveUserPicture, LoadUserProfile } from '@/domain/contracts/repos'
import { PgUser } from '@/infra/repos/postgres/entities'

import { getRepository } from 'typeorm'

type saveInput = SaveUserPicture.Input

type loadInput = LoadUserProfile.Input
type loadOutput = LoadUserProfile.Output
export class PgUserProfileRepository implements SaveUserPicture {
  async savePicture ({ id, pictureUrl, initials }: saveInput): Promise<void> {
    const pgUserRepo = getRepository(PgUser)
    await pgUserRepo.update({ id: parseInt(id) }, { pictureUrl, initials })
  }

  async load ({ id }: loadInput): Promise<loadOutput> {
    const pgUserRepo = getRepository(PgUser)
    const pgUser = await pgUserRepo.findOne({ id: parseInt(id) })
    if (pgUser !== undefined) {
      return { name: pgUser.name }
    }
  }
}
