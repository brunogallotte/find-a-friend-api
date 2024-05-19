import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register Use Case', async () => {
  let usersRepository: InMemoryUsersRepository
  let sut: RegisterUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456789',
      zipCode: '25940220',
      address: 'Rua 1',
      phone: '123456789',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456789',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'john.doe@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456789',
      zipCode: '25940220',
      address: 'Rua 1',
      phone: '123456789',
    })

    expect(
      async () =>
        await sut.execute({
          name: 'John Doe',
          email,
          password: '123456789',
          zipCode: '25940220',
          address: 'Rua 1',
          phone: '123456789',
        }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
