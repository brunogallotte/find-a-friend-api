import { makeAddPetUseCase } from '@/use-cases/factories/make-add-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function addPet(request: FastifyRequest, reply: FastifyReply) {
  const petSchema = z.object({
    name: z.string(),
    age: z.enum(['BABY', 'YOUNG', 'ADULT', 'SENIOR']),
    bio: z.string(),
    size: z.enum(['SMALL', 'MEDIUM', 'BIG']),
    energy_level: z.enum(['VERY_LOW', 'LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH']),
    independence_level: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    environment: z.enum(['SPACIOUS', 'OUTDOOR', 'INDOOR']),
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

  let pet

  try {
    const addPetUseCase = makeAddPetUseCase()

    pet = await addPetUseCase.execute({
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

  return reply.status(201).send(pet)
}
