import { prisma } from './lib/prisma'
import fastify from 'fastify'
import { z } from 'zod'

export const app = fastify()

app.post('/users', async (request, reply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, name, password } = registerBodySchema.parse(request.body)

  await prisma.user.create({
    data: {
      email,
      name,
      password_hash: password, // TODO: Create Hash from password
    },
  })

  return reply.status(201).send()
})
