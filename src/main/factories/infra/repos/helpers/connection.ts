import { PgConnection } from '@/infra/repos/postgres/helpers/connection'

export const makePgConnectionController = (): PgConnection => {
  return PgConnection.getInstance()
}
