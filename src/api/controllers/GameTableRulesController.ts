import { Request , Response } from 'express'
import { FindGameTableSkillUseCase } from '../../application/use-cases/table-game-rules-use-case/FindGameTableSkillUseCase'
import { FindGameTableSkillsUseCase } from '../../application/use-cases/table-game-rules-use-case/FindAllGameTableSkillsUseCase'
import { FindGameTableAdvantageUseCase } from '../../application/use-cases/table-game-rules-use-case/FindGameTableAdvantageUseCase'
import { FindGameTableAdvantagesUseCase } from '../../application/use-cases/table-game-rules-use-case/FindAllGameTableAdvantagesUseCase '
import { CreateGameTableAdvantagesUseCase } from '../../application/use-cases/table-game-rules-use-case/CreateGameTableAdvantagesUseCase'
import { EditGameTableAdvantagesUseCase } from '../../application/use-cases/table-game-rules-use-case/EditGameTableAdvantagesUseCase'
import { FindGameTablePeculiarityUseCase } from '../../application/use-cases/table-game-rules-use-case/FindGameTablePeculiarityUseCase'
import { FindAllGameTablePeculiaritiesUseCase } from '../../application/use-cases/table-game-rules-use-case/FindAllGameTablePeculiaritiesUseCase'
import { CreateGameTablePeculiaritiesUseCase } from '../../application/use-cases/table-game-rules-use-case/CreateGameTablePeculiaritiesUseCase'
import { EditGameTablePeculiaritiesUseCase } from '../../application/use-cases/table-game-rules-use-case/EditGameTablePeculiaritiesUseCase'
import { FindGameTableItemUseCase } from '../../application/use-cases/table-game-rules-use-case/FindGameTableItemUseCase'
import { FindGameTableItemsUseCase } from '../../application/use-cases/table-game-rules-use-case/FindAllGameTableItemsUseCase'
import { CreateGameTableItemsUseCase } from '../../application/use-cases/table-game-rules-use-case/CreateGameTableItemsUseCase'
import { EditGameTableItemsUseCase } from '../../application/use-cases/table-game-rules-use-case/EditGameTableItemsUseCase'
import { FindGameTableNPCUseCase } from '../../application/use-cases/table-game-rules-use-case/FindGameTableNPCUseCase'
import { FindAllGameTableNPCSUseCase } from '../../application/use-cases/table-game-rules-use-case/FindAllGameTableNPCSUseCase'
import { CreateGameTableNPCUseCase } from '../../application/use-cases/table-game-rules-use-case/CreateGameTableNPCUseCase'
import { EditGameTableNPCUseCase } from '../../application/use-cases/table-game-rules-use-case/EditGameTableNPCUseCase'
import { CreateGameTableNPCVisibilityUseCase } from '../../application/use-cases/table-game-rules-use-case/CreateGameTableNPCVisibilityUseCase'
import { EditGameTableNPCVisibilityUseCase } from '../../application/use-cases/table-game-rules-use-case/EditGameTableNPCVisibilityUseCase'
import { FindGameTableNPCVisibilityUseCase } from '../../application/use-cases/table-game-rules-use-case/FindGameTableNPCVisibilityUseCase'

export class GameTableRulesController {
  constructor(
    private findGameTableSkillUseCase: FindGameTableSkillUseCase,
    private findAllGameTableSkillsUseCase: FindGameTableSkillsUseCase,
    private findGameTableAdvantageUseCase: FindGameTableAdvantageUseCase,
    private findAllGameTableAdvantagesUseCase: FindGameTableAdvantagesUseCase,
    private findGameTablePeculiarityUseCase: FindGameTablePeculiarityUseCase,
    private findAllGameTablePeculiaritiesUseCase: FindAllGameTablePeculiaritiesUseCase,
    private findGameTableItemUseCase: FindGameTableItemUseCase,
    private findAllGameTableItemsUseCase: FindGameTableItemsUseCase,
    private findGameTableNPCSUseCase: FindGameTableNPCUseCase,
    private findAllGameTableNPCSUseCase: FindAllGameTableNPCSUseCase,
    private createGameTableAdvantagesUseCase?: CreateGameTableAdvantagesUseCase,
    private editGameTableAdvantagesUseCase?: EditGameTableAdvantagesUseCase,
    private createGameTablePeculiaritiesUseCase?: CreateGameTablePeculiaritiesUseCase,
    private editGameTablePeculiaritiesUseCase?: EditGameTablePeculiaritiesUseCase,
    private createGameTableItemsUseCase?: CreateGameTableItemsUseCase,
    private editGameTableItemsUseCase?: EditGameTableItemsUseCase,
    private createGameTableNPCSUseCase?: CreateGameTableNPCUseCase,
    private editGameTableNPCSUseCase?: EditGameTableNPCUseCase,
    private createGameTableNPCVisibilityUseCase?: CreateGameTableNPCVisibilityUseCase,
    private editGameTableNPCVisibilityUseCase?: EditGameTableNPCVisibilityUseCase,
    private findGameTableNPCVisibilityUseCase?: FindGameTableNPCVisibilityUseCase
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

  async createAdvantage(req: Request, res: Response) {
    await this.createGameTableAdvantagesUseCase!.execute(req.body)
    return res.json({ success: true })
  }

  async editAdvantage(req: Request, res: Response) {
    await this.editGameTableAdvantagesUseCase!.execute(req.body)
    return res.json({ success: true })
  }

  async findAdvantage(req: Request, res: Response) {
    const advantage = await this.findGameTableAdvantageUseCase.execute(req.params.id as string)
    return res.json(advantage)
  }

  async createPeculiarity(req: Request, res: Response) {
    await this.createGameTablePeculiaritiesUseCase!.execute(req.body)
    return res.json({ success: true })
  }

  async editPeculiarity(req: Request, res: Response) {
    await this.editGameTablePeculiaritiesUseCase!.execute(req.body)
    return res.json({ success: true })
  }

  async findPeculiarity(req: Request, res: Response) {
    const peculiarity = await this.findGameTablePeculiarityUseCase.execute(req.params.id as string)
    return res.json(peculiarity)
  }

  async findAllPeculiarities(req: Request, res: Response) {
    const peculiarities = await this.findAllGameTablePeculiaritiesUseCase.execute(req.params.id as string)
    return res.json(peculiarities)
  }

  async createItem(req: Request, res: Response) {
    await this.createGameTableItemsUseCase!.execute(req.body)
    return res.json({ success: true })
  }

  async editItem(req: Request, res: Response) {
    await this.editGameTableItemsUseCase!.execute(req.body)
    return res.json({ success: true })
  }

  async findItem(req: Request, res: Response) {
    const item = await this.findGameTableItemUseCase.execute(req.params.id as string)
    return res.json(item)
  }

  async createNPC(req: Request, res: Response) {
    await this.createGameTableNPCSUseCase!.execute(req.body)
    return res.json({ success: true })
  }

  async editNPC(req: Request, res: Response) {
    await this.editGameTableNPCSUseCase!.execute(req.body)
    return res.json({ success: true })
  }

  async findNPC(req: Request, res: Response) {
    const npc = await this.findGameTableNPCSUseCase.execute(req.params.id as string)
    return res.json(npc)
  }

  async createNPCVisibility(req: Request, res: Response) {
    await this.createGameTableNPCVisibilityUseCase!.execute(req.body)
    return res.json({ success: true })
  }

  async editNPCVisibility(req: Request, res: Response) {
    await this.editGameTableNPCVisibilityUseCase!.execute(req.body)
    return res.json({ success: true })
  }

  async findNPCVisibility(req: Request, res: Response) {
    const visibility = await this.findGameTableNPCVisibilityUseCase!.execute(req.params.id as string)
    return res.json(visibility)
  }

  async findAllNPCVisibility(req: Request, res: Response) {
    return res.json([])
  }
}