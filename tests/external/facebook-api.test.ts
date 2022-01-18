import { FacebookApi } from '@/infra/apis'
import { AxiosHttpClient } from '@/infra/http'
import { env } from '@/main/config'

describe('Facebook Api Integration Tests', () => {
  let sut: FacebookApi
  let axiosClient: AxiosHttpClient
  let clientId: string
  let clientSecret: string
  let token: string

  beforeAll(() => {
    axiosClient = new AxiosHttpClient()
    clientId = env.facebookApi.clientId
    clientSecret = env.facebookApi.clientSecret
    sut = new FacebookApi(axiosClient, clientId, clientSecret)
    token = env.facebookApi.accessToken
  })

  it('should return a Facebook User if token is valid', async () => {
    const fbUser = await sut.loadUser({ token })

    expect(fbUser).toEqual({
      facebookId: '104083065507091',
      name: 'Thomas Teste',
      email: 'thomas_noutkeu_teste@tfbnw.net'
    })
  })

  it('should return undefined if token is invalid', async () => {
    const fbUser = await sut.loadUser({ token: 'invalid' })

    expect(fbUser).toBeUndefined()
  })
})
