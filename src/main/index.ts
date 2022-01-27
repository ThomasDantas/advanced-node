import './config/main-alias'

import { PgConnection } from '@/infra/repos/postgres/helpers/connection'

import 'reflect-metadata'

PgConnection.getInstance().connect()
  .then(async () => {
    const { app, env } = await import('@/main/config')
    app.listen(env.port, () => console.log(`Server Running at http://localhost:${env.port}`))
  })
  .catch(console.error)
