import { Controller } from '@/application/controllers'
import { DbTransactionController } from '@/application/decorators/db-transaction-controller'
import { makePgConnectionController } from '@/main/factories/infra/repos/helpers'

export const makePgTransactionController = (controller: Controller): DbTransactionController => {
  return new DbTransactionController(controller, makePgConnectionController())
}
