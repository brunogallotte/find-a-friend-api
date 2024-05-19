import { Pets, Prisma } from '@prisma/client'

export interface PetsRepository {
  findById(email: string): Promise<Pets | null>
  create(data: Prisma.PetsUncheckedCreateInput): Promise<Pets>
}
