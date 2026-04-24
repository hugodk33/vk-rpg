import { Request , Response } from 'express'
import { FindGameTableSkillUseCase } from '../../application/use-cases/table-game-rules-use-case/FindGameTableSkillUseCase'
import { FindGameTableSkillsUseCase } from '../../application/use-cases/table-game-rules-use-case/FindAllGameTableSkillsUseCase'
import { FindGameTableAdvantagesUseCase } from '../../application/use-cases/table-game-rules-use-case/FindAllGameTableAdvantagesUseCase '
import { FindGameTableNPCSUseCase } from '../../application/use-cases/table-game-rules-use-case/FindAllGameTableNPCSUseCase'
import { FindGameTableItemsUseCase } from '../../application/use-cases/table-game-rules-use-case/FindAllGameTableItemsUseCase'
export class GameTableRulesController {
  constructor(
    private findGameTableSkillUseCase: FindGameTableSkillUseCase,
    private findAllGameTableSkillsUseCase: FindGameTableSkillsUseCase,
    private findAllGameTableAdvantagesUseCase: FindGameTableAdvantagesUseCase,
    private findAllGameTableNPCSUseCase: FindGameTableNPCSUseCase,
    private findAllGameTableItemsUseCase: FindGameTableItemsUseCase
  ) {}

  async findSkill(req: Request, res: Response) {
    const skill = await this.findGameTableSkillUseCase.execute(req.params.id as string)
    return res.json(skill)
  }
  
  async findAllSkills(req: Request, res: Response) {
    const skills = await this.findAllGameTableSkillsUseCase.execute(req.params.id as string)
    return res.json(skills)
  }
  
  async findAllAdvantages(req: Request, res: Response) {
    const advantages = await this.findAllGameTableAdvantagesUseCase.execute(req.params.id as string)
    return res.json(advantages)
  }

  async findAllItems(req: Request, res: Response) {
    const Items = await this.findAllGameTableItemsUseCase.execute(req.params.id as string)
    return res.json(Items)
  }

  async findAllNPCS(req: Request, res: Response) {
    const NPCS = await this.findAllGameTableNPCSUseCase.execute(req.params.id as string)
    return res.json(NPCS)
  }
}