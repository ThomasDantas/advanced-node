import { ConnectionOptions } from 'typeorm'

export const config: ConnectionOptions = {
  type: 'postgres',
  host: 'castor.db.elephantsql.com',
  port: 5432,
  username: 'qgilyrqf',
  database: 'qgilyrqf',
  password: 'KRXTsIx5sp7UOKOfYIowHEO9sj3g663Q',
  entities: ['dist/infra/postgres/entities/index.js']
}
