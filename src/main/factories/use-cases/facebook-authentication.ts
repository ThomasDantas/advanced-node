import { setupFacebookAuthentication, FacebookAuthentication } from '@/domain/use-cases'
import { makeFacebookApi } from '@/main/factories/apis'
import { makePgUserAccountRepo } from '@/main/factories/repos'
import { makeJwtTokenGenerator } from '@/main/factories/crypto'

export const makeFacebookAuthentication = (): FacebookAuthentication => {
  const jwtTokenGenerator = makeJwtTokenGenerator()
  const pgUserAccRepo = makePgUserAccountRepo()
  const fbApi = makeFacebookApi()
  return setupFacebookAuthentication(fbApi, pgUserAccRepo, jwtTokenGenerator)
}
