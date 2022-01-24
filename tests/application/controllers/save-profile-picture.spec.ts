import { Controller, SaveProfilePictureController } from '@/application/controllers'
import { InvalidMimeTypeError, RequiredFieldError, MaxFileSizeError } from '@/application/errors/validation'

describe('SaveProfilePictureController', () => {
  let buffer: Buffer
  let mimeType: string
  let file: { buffer: Buffer, mimeType: string }
  let userId: string
  let sut: SaveProfilePictureController
  let changeProfilePicture: jest.Mock

  beforeAll(() => {
    buffer = Buffer.from('any_buffer')
    mimeType = 'image/png'
    file = { buffer, mimeType }
    userId = 'any_user_id'
    changeProfilePicture = jest.fn()
    changeProfilePicture.mockResolvedValue({ initials: 'any_initials', pictureUrl: 'any_url' })
  })

  beforeEach(() => {
    sut = new SaveProfilePictureController(changeProfilePicture)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should return 400 if file is not provided', async () => {
    const httpReponse = await sut.handle({ file: undefined as any, userId })

    expect(httpReponse).toEqual({
      statusCode: 400,
      data: new RequiredFieldError('file')
    })
  })

  it('should return 400 if file is not provided', async () => {
    const httpReponse = await sut.handle({ file: null as any, userId })

    expect(httpReponse).toEqual({
      statusCode: 400,
      data: new RequiredFieldError('file')
    })
  })

  it('should return 400 if file is empty', async () => {
    const httpReponse = await sut.handle({ file: { buffer: Buffer.from(''), mimeType }, userId })

    expect(httpReponse).toEqual({
      statusCode: 400,
      data: new RequiredFieldError('file')
    })
  })

  it('should return 400 if file type is invalid', async () => {
    const httpReponse = await sut.handle({ file: { buffer, mimeType: 'invalid_type' }, userId })

    expect(httpReponse).toEqual({
      statusCode: 400,
      data: new InvalidMimeTypeError(['png', 'jpeg'])
    })
  })

  it('should not return 400 if file type is valid', async () => {
    const httpReponse = await sut.handle({ file: { buffer, mimeType: 'image/png' }, userId })

    expect(httpReponse).not.toEqual({
      statusCode: 400,
      data: new InvalidMimeTypeError(['png', 'jpeg'])
    })
  })

  it('should not return 400 if file type is valid', async () => {
    const httpReponse = await sut.handle({ file: { buffer, mimeType: 'image/jpg' }, userId })

    expect(httpReponse).not.toEqual({
      statusCode: 400,
      data: new InvalidMimeTypeError(['png', 'jpeg'])
    })
  })

  it('should not return 400 if file type is valid', async () => {
    const httpReponse = await sut.handle({ file: { buffer, mimeType: 'image/jpeg' }, userId })

    expect(httpReponse).not.toEqual({
      statusCode: 400,
      data: new InvalidMimeTypeError(['png', 'jpeg'])
    })
  })

  it('should return 400 if file size is bigger than 5MB', async () => {
    const invalidBuffer = Buffer.from(new ArrayBuffer(6 * 1024 * 1024))
    const httpReponse = await sut.handle({ file: { buffer: invalidBuffer, mimeType }, userId })

    expect(httpReponse).toEqual({
      statusCode: 400,
      data: new MaxFileSizeError(5)
    })
  })

  it('should call ChangeProfilePicture with correct input', async () => {
    await sut.handle({ file, userId })

    expect(changeProfilePicture).toHaveBeenCalledWith({
      id: userId,
      file: buffer
    })
    expect(changeProfilePicture).toHaveBeenCalledTimes(1)
  })

  it('should return 200 with valid data', async () => {
    const httpResponse = await sut.handle({ file, userId })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { initials: 'any_initials', pictureUrl: 'any_url' }
    })
  })
})
