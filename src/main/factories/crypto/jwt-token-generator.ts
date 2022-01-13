import { env } from '@/main/config'
import { JwtTokenGenerator } from '@/infra/crypto'

export const makeJwtTokenGenerator = (): JwtTokenGenerator => {
  return new JwtTokenGenerator(env.jwtSecret)
}
