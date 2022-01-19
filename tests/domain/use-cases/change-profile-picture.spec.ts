import { mock, MockProxy } from 'jest-mock-extended'

type Setup = (fileStorage: UploadFile, crypto: UUIDGenerator) => ChangeProfilePicture
type Input = { id: string, file: Buffer }
type ChangeProfilePicture = (input: Input) => Promise<void>

export const setupChangeProfilePicture: Setup = (fileStorage, crypto) => async ({ id, file }) => {
  await fileStorage.upload({ file, key: crypto.uuid({ key: id }) })
}

interface UploadFile {
  upload: (input: UploadFile.Input) => Promise<void>
}

namespace UploadFile {
  export type Input = {file: Buffer, key: string}
}

interface UUIDGenerator {
  uuid: (input: UUIDGenerator.Input) => UUIDGenerator.Output
}

namespace UUIDGenerator {
  export type Input = { key: string}
  export type Output = string
}

describe('ChangeProfilePicture', () => {
  let sut: ChangeProfilePicture
  let file: Buffer
  let fileStorage: MockProxy<UploadFile>
  let uuid: string
  let crypto: MockProxy<UUIDGenerator>

  beforeAll(() => {
    file = Buffer.from('any_buffer')
    fileStorage = mock<UploadFile>()
    crypto = mock<UUIDGenerator>()
    uuid = 'any_unique_id'
    sut = setupChangeProfilePicture(fileStorage, crypto)
  })

  beforeEach(() => {})

  it('should call UploadFile with correct input', async () => {
    crypto.uuid.mockReturnValueOnce(uuid)
    await sut({ id: 'any_id', file })

    expect(fileStorage.upload).toHaveBeenCalledWith({ file, key: uuid })
    expect(fileStorage.upload).toHaveBeenCalledTimes(1)
  })
})
