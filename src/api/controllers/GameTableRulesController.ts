import { Request , Response } from 'express'
import { FindGameTableSkillUseCase } from '../../application/use-cases/table-game-rules-use-case/FindGameTableSkillUseCase'
import { FindGameTableSkillsUseCase } from '../../application/use-cases/table-game-rules-use-case/FindAllGameTableSkillsUseCase'

export class GameTableRulesController {
  constructor(
    private findGameTableSkillUseCase: FindGameTableSkillUseCase,
    private findAllGameTableSkillsUseCase: FindGameTableSkillsUseCase
  ) {}
  async findSkill(req: Request, res: Response) {
    const user = await this.findGameTableSkillUseCase.execute(req.params.id as string)
    return res.json(user)
  }
  
  async findAllSkills(req: Request, res: Response) {
    const users = await this.findAllGameTableSkillsUseCase.execute()
    return res.json(users)
  }
}