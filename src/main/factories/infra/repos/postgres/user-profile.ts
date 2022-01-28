import { PgUserProfileRepository } from '@/infra/repos/postgres/repos'

export const makePgUserProfileRepo = (): PgUserProfileRepository => {
  return new PgUserProfileRepository()
}
