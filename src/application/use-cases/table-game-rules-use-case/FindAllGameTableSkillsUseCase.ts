import { IGameTableRulesRepository } from '../../../domain/irepositories/IGameTableRulesRepository'

export class FindGameTableSkillsUseCase {
  constructor(private repo: IGameTableRulesRepository) {}
  async execute(id: any, search?: string, type?: string, difficulty?: string) {
    const gameTableSkills = await this.repo.findAllGameTableSkills(id, search, type, difficulty)
    return gameTableSkills
  }
}
