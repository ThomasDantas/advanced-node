import { makeDeletePictureController } from '@/main/factories/application/controllers'
import { adaptExpressRoute as adapt } from '@/main/adapters'
import { auth } from '@/main/middlewares/authentication'

import { Router } from 'express'

export default (router: Router): void => {
  router.delete('/users/picture', auth, adapt(makeDeletePictureController()))
}
