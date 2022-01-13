import './config/main-alias'

import { app, env } from '@/main/config'

import 'reflect-metadata'

app.listen(env.port, () => console.log(`Server Running at http://localhost:${env.port}`))
