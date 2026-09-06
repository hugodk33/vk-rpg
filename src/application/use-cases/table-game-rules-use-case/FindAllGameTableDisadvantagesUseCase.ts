import { IGameTableRulesRepository } from '../../../domain/irepositories/IGameTableRulesRepository'

export class FindGameTableDisadvantagesUseCase {
  constructor(private repo: IGameTableRulesRepository) {}
  async execute(id: any, search?: string, category?: string, viewer?: any) {
    const disadvantages = await this.repo.findAllGameDisadvantages(id, search, category, viewer)
    return disadvantages
  }
}
