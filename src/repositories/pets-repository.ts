import { Pets, Prisma } from '@prisma/client'

export interface SearchPetsParams {
  city: string
  age?: 'BABY' | 'YOUNG' | 'ADULT' | 'SENIOR'
  size?: 'SMALL' | 'MEDIUM' | 'BIG'
  energy_level?: 'VERY_LOW' | 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH'
  environment?: 'SPACIOUS' | 'OUTDOOR' | 'INDOOR'
  independence_level?: 'LOW' | 'MEDIUM' | 'HIGH'
}

export interface PetsRepository {
  findById(email: string): Promise<Pets | null>
  searchMany(params: SearchPetsParams): Promise<Pets[] | null>
  create(data: Prisma.PetsUncheckedCreateInput): Promise<Pets>
}
