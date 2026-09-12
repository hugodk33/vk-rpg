import { IGameTableRulesRepository } from '../../../domain/irepositories/IGameTableRulesRepository'

export class FindAllGameTableNPCSUseCase {
  constructor(private repo: IGameTableRulesRepository) {}
  async execute(id: any, location?: any) {
    const gameTableNPCS = await this.repo.findAllGameNPCS(id, location)
    return gameTableNPCS
  }
}
