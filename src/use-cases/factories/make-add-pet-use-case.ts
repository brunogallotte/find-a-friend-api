import { PrismaPetsRepository } from '@/repositories/prisma-pets-repository'
import { AddPetUseCase } from '../add-pet'

export function makeAddPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const addPetUseCase = new AddPetUseCase(petsRepository)

  return addPetUseCase
}
