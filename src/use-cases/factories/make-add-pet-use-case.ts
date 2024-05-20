import { PrismaPetsRepository } from '@/repositories/prisma-pets-repository'
import { AddPetUseCase } from '../add-pet'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'

export function makeAddPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const usersRepository = new PrismaUsersRepository()
  const addPetUseCase = new AddPetUseCase(petsRepository, usersRepository)

  return addPetUseCase
}
