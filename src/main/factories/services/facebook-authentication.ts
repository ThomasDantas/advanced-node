import { FacebookAuthenticationService } from '@/data/contracts/services'
import { makeFacebookApi } from '@/main/factories/apis'
import { makePgUserAccountRepo } from '@/main/factories/repos'
import { makeJwtTokenGenerator } from '@/main/factories/crypto'

export const makeFacebookAuthenticationService = (): FacebookAuthenticationService => {
  const jwtTokenGenerator = makeJwtTokenGenerator()
  const pgUserAccRepo = makePgUserAccountRepo()
  const fbApi = makeFacebookApi()
  return new FacebookAuthenticationService(fbApi, pgUserAccRepo, jwtTokenGenerator)
}
