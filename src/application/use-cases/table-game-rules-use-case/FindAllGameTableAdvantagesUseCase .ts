import { IGameTableRulesRepository } from '../../../domain/irepositories/IGameTableRulesRepository'

export class FindGameTableAdvantagesUseCase {
  constructor(private repo: IGameTableRulesRepository) {}
  async execute(id: any) {
    const gameTableAdvantages = await this.repo.findAllGameAdvantages(id)
    return gameTableAdvantages
  }
}
