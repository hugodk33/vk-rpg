import { IGameTableRulesRepository } from '../../../domain/irepositories/IGameTableRulesRepository'

export class FindTableLocationUseCase {
  constructor(private repo: IGameTableRulesRepository) {}
  async execute(id: any) {
    const location = await this.repo.findGameLocation(id)
    return location
  }
}
