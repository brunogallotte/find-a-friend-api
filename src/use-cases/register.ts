import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterUseCaseParamsRequest {
  name: string
  email: string
  password: string
  zipCode: string
  address: string
  phone: string
}

export class RegisterUseCase {
  constructor(private usersRepository: any) {}

  async execute({
    name,
    email,
    password,
    zipCode,
    address,
    phone,
  }: RegisterUseCaseParamsRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new Error('E-mail already exists')
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
