import { SearchPetsParams } from '@/repositories/pets-repository'
import { makeSearchPetsUseCase } from '@/use-cases/factories/make-get-all-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const querySchema = z.object({
  city: z.string().min(1),
  age: z.string().optional(),
  size: z.string().optional(),
  energy_level: z.string().optional(),
  environment: z.string().optional(),
})

export async function searchPets(request: FastifyRequest, reply: FastifyReply) {
  const { city, age, size, energy_level, environment } = querySchema.parse(
    request.query,
  )

  const searchPetsUseCase = makeSearchPetsUseCase()

  try {
    const pets = await searchPetsUseCase.execute({
      city,
      age: age as SearchPetsParams['age'],
      size: size as SearchPetsParams['size'],
      energy_level: energy_level as SearchPetsParams['energy_level'],
      environment: environment as SearchPetsParams['environment'],
    })

    return reply.status(200).send(pets)
  } catch (err) {
    return err
  }
}
