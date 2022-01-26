import { SaveProfilePictureController } from '@/application/controllers'
import { makeChangeProfilePicture } from '@/main/factories/domain/use-cases'

export const makeSavePictureController = (): SaveProfilePictureController => {
  return new SaveProfilePictureController(makeChangeProfilePicture())
}
