import { PrismaPetsRepository } from '@/repositories/prisma-pets-repository'
import { GetPetDetailsUseCase } from '../get-pet-details'

export function makeGetAllPetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const getAllPetsUseCase = new GetPetDetailsUseCase(petsRepository)

  return getAllPetsUseCase
}
