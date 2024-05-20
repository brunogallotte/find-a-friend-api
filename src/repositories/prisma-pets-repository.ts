import { Pets, Prisma } from '@prisma/client'
import { PetsRepository } from './pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetsUncheckedCreateInput): Promise<Pets> {
    const pet = await prisma.pets.create({ data })

    return pet
  }

  async findManyByState(state: string): Promise<Pets[] | null> {
    const pets = await prisma.pets.findMany({ where: { state } })
    return pets
  }

  async findById(id: string): Promise<Pets | null> {
    const pet = await prisma.pets.findUnique({ where: { id } })

    return pet
  }
}
