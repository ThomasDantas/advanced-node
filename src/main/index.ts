import './config/main-alias'

import { app, env } from '@/main/config'
import { config } from '@/infra/postgres/helpers'

import 'reflect-metadata'
import { createConnection } from 'typeorm'

createConnection(config)
  .then(() => app.listen(env.port, () => console.log(`Server Running at http://localhost:${env.port}`)))
  .catch(console.error)
