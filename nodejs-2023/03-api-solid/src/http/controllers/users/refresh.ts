import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true }) // Verifica apenas o cookie e não o header

  const { role } = request.user

  const token = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )

  const refreshToken = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
        expiresIn: '7d',
      },
    },
  )

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true, // Encripta via HTTPs - O front-end não consegue ler o valor desse cookie de uma forma bruta
      sameSite: true,
      httpOnly: true, // cookie só vai poder ser acessado pelo backend - não pelo browser
    })
    .status(200)
    .send({
      token,
    })
}
