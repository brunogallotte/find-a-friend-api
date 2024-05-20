import { makeGetAllPetsUseCase } from '@/use-cases/factories/make-get-all-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getAllPets(request: FastifyRequest, reply: FastifyReply) {
  const { query } = request.params as { query: string }

  const getAllPetsUseCase = makeGetAllPetsUseCase()

  try {
    const pets = await getAllPetsUseCase.execute(query.toLocaleUpperCase())

    return reply.status(200).send(pets)
  } catch (err) {
    return err
  }
}
