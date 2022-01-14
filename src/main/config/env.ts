export const env = {
  facebookApi: {
    clientId: process.env.FB_CLIENT_ID ?? '701947017857121',
    clientSecret: process.env.FB_CLIENT_SECRET ?? '1ac506460ea01035e8fdf018a9ae9d49',
    token: 'EAAJZBasamiGEBAHv9XlPo2UBNcseuNPY3MEshFhkHMNSkQ52Lh9TuEC9TmIT2eWBoxVqKL9aLadGCJakZAIrJM03Gy8fg3vHjEK2tSchVbz0QMkAo3ZACIetPsJ79EgGP0OUoW4uYyQjfrA6UZCDxjsIpG1Ov2qpVZBe4hyMs8baFvXHr1jloIW5V9jPUNWWUq8EGpTwGZBNUOyn65F7LC'
  },
  port: process.env.PORT ?? 8080,
  jwtSecret: process.env.JWT_SECRET ?? 'secret'
}
