import { FacebookAuthenticationUseCase } from '@/domain/use-cases'
import { makeFacebookApi } from '@/main/factories/apis'
import { makePgUserAccountRepo } from '@/main/factories/repos'
import { makeJwtTokenGenerator } from '@/main/factories/crypto'

export const makeFacebookAuthentication = (): FacebookAuthenticationUseCase => {
  const jwtTokenGenerator = makeJwtTokenGenerator()
  const pgUserAccRepo = makePgUserAccountRepo()
  const fbApi = makeFacebookApi()
  return new FacebookAuthenticationUseCase(fbApi, pgUserAccRepo, jwtTokenGenerator)
}
