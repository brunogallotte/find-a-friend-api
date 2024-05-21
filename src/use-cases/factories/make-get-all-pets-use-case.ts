import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetAllPetsUseCase } from '../search-pets'

export function makeGetAllPetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const getAllPetsUseCase = new GetAllPetsUseCase(petsRepository)

  return getAllPetsUseCase
}
