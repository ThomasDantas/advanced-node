import './config/main-alias'

import 'reflect-metadata'
import { createConnection, getConnectionOptions } from 'typeorm'

getConnectionOptions()
  .then(async options => {
    const root = process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'
    const entities = [`${root}/infra/repos/postgres/entities/index.{js,ts}`]
    await createConnection({ ...options, entities })
    const { app, env } = await import('@/main/config')
    app.listen(env.port, () => console.log(`Server Running at http://localhost:${env.port}`))
  })
  .catch(console.error)
