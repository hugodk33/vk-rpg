import { IGameTableRulesRepository } from '../../../domain/irepositories/IGameTableRulesRepository'

export class FindGameTableItemsUseCase {
  constructor(private repo: IGameTableRulesRepository) {}
  async execute(id: any, search?: string, category?: string, type?: string, viewer?: any) {
    const gameTableItems = await this.repo.findAllGameItems(id, search, category, type, viewer)
    return gameTableItems
  }
}
