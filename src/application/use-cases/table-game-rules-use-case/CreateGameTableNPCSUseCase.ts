import { IGameTableRulesRepository } from '../../../domain/irepositories/IGameTableRulesRepository'

export class CreateGameTableNPCSUseCase {
  constructor(private repo: IGameTableRulesRepository) {}
  async execute(npc: any) {
    await this.repo.createGameNPCS(npc)
  }
}