import { setupFacebookAuthentication, FacebookAuthentication } from '@/domain/use-cases'
import { makeFacebookApi } from '@/main/factories/apis'
import { makePgUserAccountRepo } from '@/main/factories/repos'
import { makeJwtTokenHandler } from '@/main/factories/crypto'

export const makeFacebookAuthentication = (): FacebookAuthentication => {
  const JwtTokenHandler = makeJwtTokenHandler()
  const pgUserAccRepo = makePgUserAccountRepo()
  const fbApi = makeFacebookApi()
  return setupFacebookAuthentication(fbApi, pgUserAccRepo, JwtTokenHandler)
}
