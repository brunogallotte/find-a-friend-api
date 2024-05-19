import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register Use Case', async () => {
  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
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
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = 'john.doe@example.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456789',
      zipCode: '25940220',
      address: 'Rua 1',
      phone: '123456789',
    })

    expect(
      async () =>
        await registerUseCase.execute({
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
