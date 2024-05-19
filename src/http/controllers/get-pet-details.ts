import { makeGetPetDetailsUseCase } from '@/use-cases/factories/make-get-pet-details-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getPetDetails(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = request.params as { id: string }

  const getPetDetailsUseCase = makeGetPetDetailsUseCase()

  try {
    const pet = await getPetDetailsUseCase.execute(id)
    return reply.status(200).send(pet)
  } catch (err) {
    return err
  }
}
