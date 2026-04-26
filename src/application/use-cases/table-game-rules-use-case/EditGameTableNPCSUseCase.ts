import { IGameTableRulesRepository } from '../../../domain/irepositories/IGameTableRulesRepository'

export class EditGameTableNPCSUseCase {
  constructor(private repo: IGameTableRulesRepository) {}
  async execute(npc: any) {
    await this.repo.editGameNPCS(npc)
  }
}