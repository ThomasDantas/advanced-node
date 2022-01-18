import { AuthenticationMiddleware } from '@/application/middlewares/authentication'
import { setupAuthorize } from '@/domain/use-cases/authorize'
import { makeJwtTokenHandler } from '@/main/factories/crypto'

export const makeAuthenticationMiddleware = (): AuthenticationMiddleware => {
  const authorize = setupAuthorize(makeJwtTokenHandler())
  return new AuthenticationMiddleware(authorize)
}
