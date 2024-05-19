import { makeAddPetUseCase } from '@/use-cases/factories/make-add-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function addPet(request: FastifyRequest, reply: FastifyReply) {
  const petSchema = z.object({
    name: z.string(),
    age: z.string(),
    bio: z.string(),
    size: z.string(),
    energy_level: z.string(),
    independence_level: z.string(),
    environment: z.string(),
    pictures: z.array(z.string()),
  })

  const {
    name,
    age,
    bio,
    size,
    energy_level,
    independence_level,
    environment,
    pictures,
  } = petSchema.parse(request.body)

  try {
    const addPetUseCase = makeAddPetUseCase()

    await addPetUseCase.execute({
      name,
      age,
      bio,
      size,
      energy_level,
      independence_level,
      environment,
      pictures,
      user_id: request.user.sub,
    })
  } catch (err) {
    return err
  }

  return reply.status(201).send()
}
