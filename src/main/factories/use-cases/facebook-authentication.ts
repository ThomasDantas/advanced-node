import { setupFacebookAuthentication, FacebookAuthentication } from '@/domain/use-cases'
import { makeFacebookApi, makeJwtTokenHandler } from '@/main/factories/gateways'
import { makePgUserAccountRepo } from '@/main/factories/repos'

export const makeFacebookAuthentication = (): FacebookAuthentication => {
  const JwtTokenHandler = makeJwtTokenHandler()
  const pgUserAccRepo = makePgUserAccountRepo()
  const fbApi = makeFacebookApi()
  return setupFacebookAuthentication(fbApi, pgUserAccRepo, JwtTokenHandler)
}
