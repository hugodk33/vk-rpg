import { IGameTableRulesRepository } from '../../../domain/irepositories/IGameTableRulesRepository'

export class CreateGameTableItemsUseCase {
  constructor(private repo: IGameTableRulesRepository) {}
  async execute(item: any) {
    await this.repo.createGameItems(item)
  }
}