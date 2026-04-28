import { IGameTableRulesRepository } from '../../../domain/irepositories/IGameTableRulesRepository'

export class FindGameTableItemsUseCase {
  constructor(private repo: IGameTableRulesRepository) {}
  async execute(id: any) {
    const gameTableItems = await this.repo.findAllGameItems(id)
    return gameTableItems
  }
}
