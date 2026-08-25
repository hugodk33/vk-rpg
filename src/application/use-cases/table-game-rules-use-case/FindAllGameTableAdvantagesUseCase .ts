import { IGameTableRulesRepository } from '../../../domain/irepositories/IGameTableRulesRepository'

export class FindGameTableAdvantagesUseCase {
  constructor(private repo: IGameTableRulesRepository) {}
  async execute(id: any, search?: string, category?: string) {
    const gameTableAdvantages = await this.repo.findAllGameAdvantages(id, search, category)
    return gameTableAdvantages
  }
}
