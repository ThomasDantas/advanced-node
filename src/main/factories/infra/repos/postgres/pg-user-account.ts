import { PgAccountUserRepository } from '@/infra/repos/postgres/repos'

export const makePgUserAccountRepo = (): PgAccountUserRepository => {
  return new PgAccountUserRepository()
}
