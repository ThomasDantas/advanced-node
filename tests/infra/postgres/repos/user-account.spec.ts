import { PgAccountUserRepository } from '@/infra/postgres/repos'
import { PgUser } from '@/infra/postgres/entities'
import { makeFakeDb } from '@/tests/infra/postgres/mocks'

import { IBackup } from 'pg-mem'
import { getRepository, Repository, getConnection } from 'typeorm'

describe('PgUserAccountRepository', () => {
  let sut: PgAccountUserRepository
  let pgUserRepo: Repository<PgUser>
  let backup: IBackup

  beforeAll(async () => {
    const db = await makeFakeDb([PgUser])
    backup = db.backup()
    pgUserRepo = getRepository(PgUser)
  })

  afterAll(async () => {
    await getConnection().close()
  })

  beforeEach(async () => {
    backup.restore()
    sut = new PgAccountUserRepository()
  })

  describe('load', () => {
    it('should return an account if email exists', async () => {
      await pgUserRepo.save({ email: 'existing_email' })
      const acc = await sut.load({ email: 'existing_email' })

      expect(acc).toEqual({ id: '1' })
    })

    it('should return undefined if email does not exists', async () => {
      const acc = await sut.load({ email: 'new_email' })

      expect(acc).toBeUndefined()
    })
  })
})
