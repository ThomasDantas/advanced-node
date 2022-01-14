import './config/main-alias'

import { app, env } from '@/main/config'

import 'reflect-metadata'
import { createConnection } from 'typeorm'

createConnection()
  .then(() => app.listen(env.port, () => console.log(`Server Running at http://localhost:${env.port}`)))
  .catch(console.error)
