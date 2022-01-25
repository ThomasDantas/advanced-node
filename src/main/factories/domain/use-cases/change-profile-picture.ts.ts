import { ChangeProfilePicture, setupChangeProfilePicture } from '@/domain/use-cases'
import { makeAwsS3FileStorage, makeUniqueId } from '@/main/factories/infra/gateways'
import { makePgUserProfileRepo } from '@/main/factories/infra/repos/postgres'

export const makeChangeProfilePicture = (): ChangeProfilePicture => {
  const awsS3FileStorage = makeAwsS3FileStorage()
  const uuid = makeUniqueId()
  const pgUser = makePgUserProfileRepo()
  return setupChangeProfilePicture(awsS3FileStorage, uuid, pgUser)
}
