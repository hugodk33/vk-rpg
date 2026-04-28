import { IGameTableRulesRepository } from '../../../domain/irepositories/IGameTableRulesRepository'

export class FindGameTableSkillsUseCase {
  constructor(private repo: IGameTableRulesRepository) {}
  async execute(id: any) {
    const gameTableSkills = await this.repo.findAllGameTableSkills(id)
    return gameTableSkills
  }
}
