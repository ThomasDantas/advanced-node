import { PgAccountUserRepository } from '@/infra/postgres/repos'

export const makePgUserAccountRepo = (): PgAccountUserRepository => {
  return new PgAccountUserRepository()
}
