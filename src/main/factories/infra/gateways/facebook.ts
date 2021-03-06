import { FacebookApi } from '@/infra/gateways'
import { makeAxiosHttpClient } from '@/main/factories/infra/gateways'
import { env } from '@/main/config'

export const makeFacebookApi = (): FacebookApi => {
  const axiosClient = makeAxiosHttpClient()
  return new FacebookApi(axiosClient, env.facebookApi.clientId, env.facebookApi.clientSecret)
}
