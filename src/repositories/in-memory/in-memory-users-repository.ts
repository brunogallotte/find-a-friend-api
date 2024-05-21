import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: 'user-01',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      city: data.city,
      zip_code: data.zip_code,
      address: data.address,
      phone: data.phone,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }
}
