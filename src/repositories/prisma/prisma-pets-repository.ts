import { Pets, Prisma } from '@prisma/client'
import { PetsRepository, SearchPetsParams } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetsUncheckedCreateInput): Promise<Pets> {
    const pet = await prisma.pets.create({ data })

    return pet
  }

  async searchMany(params: SearchPetsParams): Promise<Pets[] | null> {
    const pets = await prisma.pets.findMany({
      where: {
        age: params.age,
        size: params.size,
        energy_level: params.energy_level,
        environment: params.environment,
        independence_level: params.independence_level,
        user: {
          city: {
            contains: params.city,
            mode: 'insensitive',
          },
        },
      },
    })
    return pets
  }

  async findById(id: string): Promise<Pets | null> {
    const pet = await prisma.pets.findUnique({ where: { id } })

    return pet
  }
}
