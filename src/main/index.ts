import './config/main-alias'

import 'reflect-metadata'
import { createConnection } from 'typeorm'

createConnection()
  .then(async () => {
    const { app, env } = await import('@/main/config')
    app.listen(env.port, () => console.log(`Server Running at http://localhost:${env.port}`))
  })
  .catch(console.error)
