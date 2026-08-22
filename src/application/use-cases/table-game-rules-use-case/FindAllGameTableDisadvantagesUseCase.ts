import { IGameTableRulesRepository } from '../../../domain/irepositories/IGameTableRulesRepository'

export class FindGameTableDisadvantagesUseCase {
  constructor(private repo: IGameTableRulesRepository) {}
  async execute(id: any, search?: string, category?: string) {
    const disadvantages = await this.repo.findAllGameDisadvantages(id, search, category)
    return disadvantages
  }
}
