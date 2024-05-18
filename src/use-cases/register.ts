import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUseCaseParamsRequest {
  name: string
  email: string
  password: string
  zipCode: string
  address: string
  phone: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
    zipCode,
    address,
    phone,
  }: RegisterUseCaseParamsRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
      zip_code: zipCode,
      address,
      phone,
    })
  }
}
