import { IGameTableRulesRepository } from '../../../domain/irepositories/IGameTableRulesRepository'

export class FindAllGameTableCharactersUseCase {
  constructor(private repo: IGameTableRulesRepository) {}
  async execute(tableId: any, viewer?: any) {
    const characters = await this.repo.findAllGameCharacters(tableId, viewer)
    return characters
  }
}