import { DeleteProfilePictureController, Controller } from '@/application/controllers'

describe('DeleteProfilePictureController', () => {
  let changeProfilePicture: jest.Mock
  let sut: DeleteProfilePictureController

  beforeEach(() => {
    changeProfilePicture = jest.fn()
  })

  beforeEach(() => {
    sut = new DeleteProfilePictureController(changeProfilePicture)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should call change profile picture with correct input', async () => {
    await sut.handle({ userId: 'any_user_id' })

    expect(changeProfilePicture).toHaveBeenCalledWith({ id: 'any_user_id' })
    expect(changeProfilePicture).toHaveBeenCalledTimes(1)
  })

  it('should return 204', async () => {
    const httpResponse = await sut.handle({ userId: 'any_user_id' })

    expect(httpResponse).toEqual({
      statusCode: 204,
      data: null
    })
  })
})
