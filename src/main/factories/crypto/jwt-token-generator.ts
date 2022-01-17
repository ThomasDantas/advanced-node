import { env } from '@/main/config'
import { JwtTokenHandler } from '@/infra/crypto'

export const makeJwtTokenHandler = (): JwtTokenHandler => {
  return new JwtTokenHandler(env.jwtSecret)
}
