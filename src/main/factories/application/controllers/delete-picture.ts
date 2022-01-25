import { DeleteProfilePictureController } from '@/application/controllers'
import { makeChangeProfilePicture } from '@/main/factories/domain/use-cases'

export const makeDeletePictureController = (): DeleteProfilePictureController => {
  return new DeleteProfilePictureController(makeChangeProfilePicture())
}
