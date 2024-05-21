import { PetsRepository } from '@/repositories/pets-repository'

export class GetAllPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(query: string) {
    const allPetsInQueryCity = await this.petsRepository.findManyBycity(query)

    return allPetsInQueryCity
  }
}
