import { IGameTableRulesRepository } from '../../../domain/irepositories/IGameTableRulesRepository'

export class FindGameTableNPCSUseCase {
  constructor(private repo: IGameTableRulesRepository) {}
  async execute(id: any) {
    const gameTableNPCS = await this.repo.findAllGameNPCS(id)
    return gameTableNPCS
  }
}
