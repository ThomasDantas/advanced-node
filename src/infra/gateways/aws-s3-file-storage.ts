import { UploadFile, DeleteFile } from '@/domain/contracts/gateways/file-storage'

import { config, S3 } from 'aws-sdk'

export class AwsS3FileStorage implements UploadFile, DeleteFile {
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

  async upload ({ fileName, file }: UploadFile.Input): Promise<UploadFile.Output> {
    await new S3().putObject({
      Bucket: this.bucket,
      Key: fileName,
      Body: file,
      ACL: 'public-read'
    }).promise()
    return `https://${this.bucket}.s3.amazon.com/${encodeURIComponent(fileName)}`
  }

  async delete ({ fileName }: DeleteFile.Input): Promise<void> {
    await new S3().deleteObject({ Bucket: this.bucket, Key: fileName }).promise()
  }
}
