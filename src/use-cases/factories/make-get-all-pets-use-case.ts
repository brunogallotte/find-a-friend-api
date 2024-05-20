import { PrismaPetsRepository } from '@/repositories/prisma-pets-repository'
import { GetAllPetsUseCase } from '../get-all-pets'

export function makeGetAllPetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const getAllPetsUseCase = new GetAllPetsUseCase(petsRepository)

  return getAllPetsUseCase
}
