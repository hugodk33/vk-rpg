import { IGameTableRulesRepository } from '../../../domain/irepositories/IGameTableRulesRepository'

export class FindGameTableNPCSUseCase {
  constructor(private repo: IGameTableRulesRepository) {}
  async execute(id: any) {
    const npc = await this.repo.findGameNPCS(id)
    return npc
  }
}