import { LoadFacebookUserApi } from '@/domain/contracts/apis'
import { TokenGenerator } from '@/domain/contracts/crypto'
import { AuthenticationError } from '@/domain/models/errors'
import { LoadUserAccountRepository, SaveFacebookAccountRepository } from '@/domain/contracts/repos'
import { FacebookAccount } from '@/domain/models'
import { AccessToken } from '@/domain/models/access-token'

type Setup = (
  facebookApi: LoadFacebookUserApi,
  userAccountRepo: LoadUserAccountRepository & SaveFacebookAccountRepository,
  crypto: TokenGenerator) => FacebookAuthentication
export type FacebookAuthentication = (params: { token: string }) => Promise<AccessToken | AuthenticationError>

export const setupFacebookAuthentication: Setup = (facebookApi, userAccountRepo, crypto) => async params => {
  const fbData = await facebookApi.loadUser(params)
  if (fbData !== undefined) {
    const accountData = await userAccountRepo.load({ email: fbData?.email })
    const fbAccount = new FacebookAccount(fbData, accountData)
    const { id } = await userAccountRepo.saveWithFacebook(fbAccount)
    const token = await crypto.generateToken({ key: id, expirationInMs: AccessToken.expirationInMs })
    return new AccessToken(token)
  }
  return new AuthenticationError()
}
