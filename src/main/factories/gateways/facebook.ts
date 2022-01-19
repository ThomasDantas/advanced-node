import { FacebookApi } from '@/infra/apis'
import { makeAxiosHttpClient } from '@/main/factories/http'
import { env } from '@/main/config'

export const makeFacebookApi = (): FacebookApi => {
  const axiosClient = makeAxiosHttpClient()
  return new FacebookApi(axiosClient, env.facebookApi.clientId, env.facebookApi.clientSecret)
}
