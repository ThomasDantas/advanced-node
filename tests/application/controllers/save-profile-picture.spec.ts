import { SaveProfilePictureController } from '@/application/controllers'
import { InvalidMymeTypeError, RequiredFieldError } from '@/application/errors/http'

describe('SaveProfilePictureController', () => {
  let sut: SaveProfilePictureController
  let buffer: Buffer
  let mimeType: string

  beforeAll(() => {
    buffer = Buffer.from('any_buffer')
    mimeType = 'image/png'
  })

  beforeEach(() => {
    sut = new SaveProfilePictureController()
  })

  it('should return 400 if file is not provided', async () => {
    const httpReponse = await sut.handle({ file: undefined as any })

    expect(httpReponse).toEqual({
      statusCode: 400,
      data: new RequiredFieldError('file')
    })
  })

  it('should return 400 if file is not provided', async () => {
    const httpReponse = await sut.handle({ file: null as any })

    expect(httpReponse).toEqual({
      statusCode: 400,
      data: new RequiredFieldError('file')
    })
  })

  it('should return 400 if file is empty', async () => {
    const httpReponse = await sut.handle({ file: { buffer: Buffer.from(''), mimeType } })

    expect(httpReponse).toEqual({
      statusCode: 400,
      data: new RequiredFieldError('file')
    })
  })

  it('should return 400 if file type is invalid', async () => {
    const httpReponse = await sut.handle({ file: { buffer, mimeType: 'invalid_type' } })

    expect(httpReponse).toEqual({
      statusCode: 400,
      data: new InvalidMymeTypeError(['png', 'jpeg'])
    })
  })

  it('should not return 400 if file type is valid', async () => {
    const httpReponse = await sut.handle({ file: { buffer, mimeType: 'image/png' } })

    expect(httpReponse).not.toEqual({
      statusCode: 400,
      data: new InvalidMymeTypeError(['png', 'jpeg'])
    })
  })

  it('should not return 400 if file type is valid', async () => {
    const httpReponse = await sut.handle({ file: { buffer, mimeType: 'image/jpg' } })

    expect(httpReponse).not.toEqual({
      statusCode: 400,
      data: new InvalidMymeTypeError(['png', 'jpeg'])
    })
  })

  it('should not return 400 if file type is valid', async () => {
    const httpReponse = await sut.handle({ file: { buffer, mimeType: 'image/jpeg' } })

    expect(httpReponse).not.toEqual({
      statusCode: 400,
      data: new InvalidMymeTypeError(['png', 'jpeg'])
    })
  })
})
