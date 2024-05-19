import { PetsRepository } from '@/repositories/pets-repository'
import { PetNotFoundError } from './errors/pet-not-found-error'
import { Pets } from '@prisma/client'

export class GetPetDetailsUseCase {
  constructor(private petsReposiry: PetsRepository) {}

  async execute(id: string): Promise<Pets | null> {
    const pet = await this.petsReposiry.findById(id)

    if (!pet) {
      throw new PetNotFoundError()
    }

    return pet
  }
}
