import { IGameTableRulesRepository } from '../../../domain/irepositories/IGameTableRulesRepository'

export class FindGameTableCharacterUseCase {
  constructor(private repo: IGameTableRulesRepository) {}
  async execute(id: any) {
    const character = await this.repo.findGameCharacter(id)
    return character
  }
}
