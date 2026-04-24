import { IGameTableRulesRepository } from '../../../domain/irepositories/IGameTableRulesRepository'

export class FindGameTableSkillsUseCase {
  constructor(private repo: IGameTableRulesRepository) {}
  async execute( ) {
    const gameTableSkills = await this.repo.findAllGameTableSkills( )
    return gameTableSkills
  }
}
