import { IGameTableRulesRepository } from '../../../domain/irepositories/IGameTableRulesRepository'

export class FindGameTableDisadvantagesUseCase {
  constructor(private repo: IGameTableRulesRepository) {}
  async execute(id: any) {
    const disadvantages = await this.repo.findAllGameDisadvantages(id)
    return disadvantages
  }
}
