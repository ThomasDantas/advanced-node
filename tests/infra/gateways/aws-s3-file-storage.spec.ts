import { UploadFile } from '@/domain/contracts/gateways/file-storage'

import { config, S3 } from 'aws-sdk'
import { mocked } from 'ts-jest/utils'

jest.mock('aws-sdk')

export class AwsS3FileStorage {
  constructor (
    accessKeyId: string,
    secretAccessKey: string,
    private readonly bucket: string
  ) {
    config.update({
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
      }
    })
  }

  async upload ({ key, file }: UploadFile.Input): Promise<void> {
    const s3 = new S3()
    await s3.putObject({
      Bucket: this.bucket,
      Key: key,
      Body: file,
      ACL: 'public-read'
    }).promise()
  }
}

describe('AwsS3FileStorage', () => {
  let accessKeyId: string
  let secretAccessKey: string
  let key: string
  let file: Buffer
  let bucket: string
  let sut: AwsS3FileStorage
  let putObjectPromiseSpy: jest.Mock
  let putObjectSpy: jest.Mock

  beforeAll(() => {
    accessKeyId = 'any_access_key'
    secretAccessKey = 'any_secret_access'
    key = 'any_key'
    file = Buffer.from('any_buffer')
    bucket = 'any_bucket'
    putObjectPromiseSpy = jest.fn()
    putObjectSpy = jest.fn().mockImplementation(() => ({ promise: putObjectPromiseSpy }))
    mocked(S3).mockImplementation(jest.fn().mockImplementation(() => ({ putObject: putObjectSpy })))
  })

  beforeEach(() => {
    sut = new AwsS3FileStorage(accessKeyId, secretAccessKey, bucket)
  })

  it('should config aws credentials on creation', () => {
    expect(sut).toBeDefined()
    expect(config.update).toHaveBeenCalledWith({
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
      }
    })
    expect(config.update).toHaveBeenCalledTimes(1)
  })

  it('should call putObject with correct input', async () => {
    await sut.upload({ key, file })

    expect(putObjectSpy).toHaveBeenCalledWith({
      Bucket: bucket,
      Key: key,
      Body: file,
      ACL: 'public-read'
    })
    expect(putObjectSpy).toHaveBeenCalledTimes(1)
    expect(putObjectPromiseSpy).toHaveBeenCalledTimes(1)
  })
})
