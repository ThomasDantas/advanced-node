export const env = {
  facebookApi: {
    clientId: process.env.FB_CLIENT_ID ?? '701947017857121',
    clientSecret: process.env.FB_CLIENT_SECRET ?? '1ac506460ea01035e8fdf018a9ae9d49'
  },
  port: process.env.PORT ?? 8080,
  jwtSecret: process.env.JWT_SECRET ?? 'secret'
}
