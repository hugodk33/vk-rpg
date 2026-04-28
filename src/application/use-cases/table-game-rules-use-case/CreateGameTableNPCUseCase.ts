import { IGameTableRulesRepository } from '../../../domain/irepositories/IGameTableRulesRepository'

export class CreateGameTableNPCUseCase {
  constructor(private repo: IGameTableRulesRepository) {}
  async execute(npc: any) {
    await this.repo.createGameNPC(npc)
  }
}