import type { IUserRepository } from '../../infra/repositories/IUserRepository'
import { User } from '../../domain/entities/User'
import crypto from 'crypto'

export class CreateUserUseCase {
  constructor(private repo: IUserRepository) {}

  async execute(data: any) {
    const user = new User(
      crypto.randomUUID(),
      data.type,
      data.username,
      data.password,
      data.phone,
      data.email
    )

    await this.repo.create(user)

    return user
  }
}
