import type { IUserRepository } from '../../../domain/irepositories/IUserRepository'
import { User } from '../../../domain/entities/User'

export class EditUsersUseCase {
  constructor(private repo: IUserRepository) {}

  async execute(user: User) {
    await this.repo.editUser(user)  
  }
}
