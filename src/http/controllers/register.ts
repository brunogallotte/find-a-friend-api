import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { registerUseCase } from '@/use-cases/register'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    zipCode: z.string(),
    address: z.string(),
    phone: z.string(),
  })

  const { name, email, password, zipCode, address, phone } =
    registerBodySchema.parse(request.body)

  try {
    await registerUseCase({
      name,
      email,
      password,
      zipCode,
      address,
      phone,
    })
  } catch (error) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
