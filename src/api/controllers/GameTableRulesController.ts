import { Request , Response } from 'express'
import { FindGameTableSkillUseCase } from '../../application/use-cases/table-game-rules-use-case/FindGameTableSkillUseCase'
import { FindGameTableSkillsUseCase } from '../../application/use-cases/table-game-rules-use-case/FindAllGameTableSkillsUseCase'
import { FindGameTableAdvantageUseCase } from '../../application/use-cases/table-game-rules-use-case/FindGameTableAdvantageUseCase'
import { FindGameTableAdvantagesUseCase } from '../../application/use-cases/table-game-rules-use-case/FindAllGameTableAdvantagesUseCase '
import { FindGameTableDisadvantagesUseCase } from '../../application/use-cases/table-game-rules-use-case/FindAllGameTableDisadvantagesUseCase'
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
import { CreateGameTableCharacterUseCase } from '../../application/use-cases/table-game-rules-use-case/CreateGameTableCharacterUseCase'
import { EditGameTableCharacterUseCase } from '../../application/use-cases/table-game-rules-use-case/EditGameTableCharacterUseCase'
import { FindGameTableCharacterUseCase } from '../../application/use-cases/table-game-rules-use-case/FindGameTableCharacterUseCase'
import { FindGameTableCharacterHistoryUseCase } from '../../application/use-cases/table-game-rules-use-case/FindGameTableCharacterHistoryUseCase'
import { FindAllGameTableCharactersUseCase } from '../../application/use-cases/table-game-rules-use-case/FindAllGameTableCharactersUseCase'
import { CreateGameModifierUseCase } from '../../application/use-cases/table-game-rules-use-case/CreateGameModifierUseCase'
import { EditGameModifierUseCase } from '../../application/use-cases/table-game-rules-use-case/EditGameModifierUseCase'
import { FindGameModifierUseCase } from '../../application/use-cases/table-game-rules-use-case/FindGameModifierUseCase'
import { FindAllGameModifiersUseCase } from '../../application/use-cases/table-game-rules-use-case/FindAllGameModifiersUseCase'
import { CreateGameVisibilityUseCase } from '../../application/use-cases/table-game-rules-use-case/CreateGameVisibilityUseCase'
import { EditGameVisibilityUseCase } from '../../application/use-cases/table-game-rules-use-case/EditGameVisibilityUseCase'
import { FindGameVisibilityUseCase } from '../../application/use-cases/table-game-rules-use-case/FindGameVisibilityUseCase'
import { FindAllGameVisibilityUseCase } from '../../application/use-cases/table-game-rules-use-case/FindAllGameVisibilityUseCase'
import { CreateGameQueueUseCase } from '../../application/use-cases/table-game-rules-use-case/CreateGameQueueUseCase'
import { EditGameQueueUseCase } from '../../application/use-cases/table-game-rules-use-case/EditGameQueueUseCase'
import { FindGameQueueUseCase } from '../../application/use-cases/table-game-rules-use-case/FindGameQueueUseCase'
import { FindAllGameQueueUseCase } from '../../application/use-cases/table-game-rules-use-case/FindAllGameQueueUseCase'
import { FindGameTableDisadvantageUseCase } from '../../application/use-cases/table-game-rules-use-case/FindGameTableDisadvantageUseCase'
import { FindTableLocationUseCase } from '../../application/use-cases/table-game-rules-use-case/FindTableLocationUseCase'
export class GameTableRulesController {
  constructor(
    private findGameTableSkillUseCase: FindGameTableSkillUseCase,
    private findAllGameTableSkillsUseCase: FindGameTableSkillsUseCase,
    private findGameTableAdvantageUseCase: FindGameTableAdvantageUseCase,
    private findAllGameTableAdvantagesUseCase: FindGameTableAdvantagesUseCase,
    private findAllGameTableDisadvantagesUseCase: FindGameTableDisadvantagesUseCase,
    private findGameTablePeculiarityUseCase: FindGameTablePeculiarityUseCase,
    private findAllGameTablePeculiaritiesUseCase: FindAllGameTablePeculiaritiesUseCase,
    private findGameTableItemUseCase: FindGameTableItemUseCase,
    private findAllGameTableItemsUseCase: FindGameTableItemsUseCase ,
    private findGameTableNPCUseCase: FindGameTableNPCUseCase,
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
    private findGameTableNPCVisibilityUseCase?: FindGameTableNPCVisibilityUseCase,
    private createGameTableCharacterUseCase?: CreateGameTableCharacterUseCase,
    private editGameTableCharacterUseCase?: EditGameTableCharacterUseCase,
    private findGameTableCharacterUseCase?: FindGameTableCharacterUseCase,
    private findAllGameTableCharactersUseCase?: FindAllGameTableCharactersUseCase,
    private findGameTableCharacterHistoryUseCase?: FindGameTableCharacterHistoryUseCase,
    private createGameModifierUseCase?: CreateGameModifierUseCase,
    private editGameModifierUseCase?: EditGameModifierUseCase,
    private findGameModifierUseCase?: FindGameModifierUseCase,
    private findAllGameModifiersUseCase?: FindAllGameModifiersUseCase,
    private createGameVisibilityUseCase?: CreateGameVisibilityUseCase,
    private editGameVisibilityUseCase?: EditGameVisibilityUseCase,
    private findGameVisibilityUseCase?: FindGameVisibilityUseCase,
    private findAllGameVisibilityUseCase?: FindAllGameVisibilityUseCase,
    private createGameQueueUseCase?: CreateGameQueueUseCase,
    private editGameQueueUseCase?: EditGameQueueUseCase,
    private findGameQueueUseCase?: FindGameQueueUseCase,
    private findAllGameQueueUseCase?: FindAllGameQueueUseCase,
    private findGameTableDisadvantageUseCase?: FindGameTableDisadvantageUseCase,
    private findTableLocationUseCase?: FindTableLocationUseCase
  ) {}

  async findSkill(req: Request, res: Response) {
    const skill = await this.findGameTableSkillUseCase.execute(req.params.id as string)
    return res.json(skill)
  }
  
  async findAllSkills(req: Request, res: Response) {
    const { search, type, difficulty } = req.query
    const skills = await this.findAllGameTableSkillsUseCase.execute(
      req.params.id as string,
      search as string | undefined,
      type as string | undefined,
      difficulty as string | undefined
    )
    return res.json(skills)
  }
  
  async findAllAdvantages(req: Request, res: Response) {
    const { search, category } = req.query
    const advantages = await this.findAllGameTableAdvantagesUseCase.execute(
      req.params.id as string,
      search as string | undefined,
      category as string | undefined
    )
    return res.json(advantages)
  }

  async findAllDisadvantages(req: Request, res: Response) {
    const { search, category } = req.query
    const disadvantages = await this.findAllGameTableDisadvantagesUseCase.execute(
      req.params.id as string,
      search as string | undefined,
      category as string | undefined
    )
    return res.json(disadvantages)
  }

  async findAllItems(req: Request, res: Response) {
    const { search, category, type } = req.query
    const Items = await this.findAllGameTableItemsUseCase.execute(
      req.params.id as string,
      search as string | undefined,
      category as string | undefined,
      type as string | undefined
    )
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
    const result = await this.createGameTableItemsUseCase!.execute(req.body)
    return res.json({ success: true, ...result })
  }

  async editItem(req: Request, res: Response) {
    await this.editGameTableItemsUseCase!.execute(req.body)
    return res.json({ success: true })
  }

  async findItem(req: Request, res: Response) {
    const item = await this.findGameTableItemUseCase.execute(req.params.id as string)
    return res.json(item)
  }

  async findDisadvantage(req: Request, res: Response) {
    const disadvantage = await this.findGameTableDisadvantageUseCase!.execute(req.params.id as string)
    return res.json(disadvantage)
  }

  async findLocation(req: Request, res: Response) {
    const location = await this.findTableLocationUseCase!.execute(req.params.id as string)
    return res.json(location)
  }

  async createNPC(req: Request, res: Response) {
    const result = await this.createGameTableNPCSUseCase!.execute(req.body)
    return res.json({ success: true, ...result })
  }

  async editNPC(req: Request, res: Response) {
    await this.editGameTableNPCSUseCase!.execute(req.body)
    return res.json({ success: true })
  }

  async findNPC(req: Request, res: Response) {
    const npc = await this.findGameTableNPCUseCase.execute(req.params.id as string)
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

  async createCharacter(req: Request, res: Response) {
    try {
      const result = await this.createGameTableCharacterUseCase!.execute(req.body)
      return res.json({ success: true, ...result })
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message })
    }
  }

  async editCharacter(req: Request, res: Response) {
    await this.editGameTableCharacterUseCase!.execute(req.body)
    return res.json({ success: true })
  }

  async findCharacter(req: Request, res: Response) {
    const moment = req.query.moment ? parseInt(req.query.moment as string, 10) : undefined
    const character = await this.findGameTableCharacterUseCase!.execute(req.params.id as string, moment)
    return res.json(character)
  }

  async findCharacterHistory(req: Request, res: Response) {
    const moment = req.query.moment ? parseInt(req.query.moment as string, 10) : undefined
    const history = await this.findGameTableCharacterHistoryUseCase!.execute(req.params.id as string, moment)
    return res.json(history)
  }

  async findAllCharacters(req: Request, res: Response) {
    const characters = await this.findAllGameTableCharactersUseCase!.execute(req.params.id as string)
    return res.json(characters)
  }

  /* =============== */
  /*    MODIFIERS    */
  /* =============== */

  async createModifier(req: Request, res: Response) {
    const result = await this.createGameModifierUseCase!.execute(req.body)
    return res.json({ success: true, ...result })
  }

  async editModifier(req: Request, res: Response) {
    await this.editGameModifierUseCase!.execute(req.body)
    return res.json({ success: true })
  }

  async findModifier(req: Request, res: Response) {
    const modifier = await this.findGameModifierUseCase!.execute(req.params.id as string)
    return res.json(modifier)
  }

  async findAllModifiers(req: Request, res: Response) {
    const modifiers = await this.findAllGameModifiersUseCase!.execute(req.params.id as string)
    return res.json(modifiers)
  }

  /* =============== */
  /*   VISIBILITY    */
  /* =============== */

  async createVisibility(req: Request, res: Response) {
    const result = await this.createGameVisibilityUseCase!.execute(req.body)
    return res.json({ success: true, ...result })
  }

  async editVisibility(req: Request, res: Response) {
    await this.editGameVisibilityUseCase!.execute(req.body)
    return res.json({ success: true })
  }

  async findVisibility(req: Request, res: Response) {
    const visibility = await this.findGameVisibilityUseCase!.execute(req.params.id as string)
    return res.json(visibility)
  }

  async findAllVisibility(req: Request, res: Response) {
    const visibility = await this.findAllGameVisibilityUseCase!.execute(req.params.id as string)
    return res.json(visibility)
  }

  /* =============== */
  /*      QUEUE      */
  /* =============== */

  async createQueue(req: Request, res: Response) {
    const result = await this.createGameQueueUseCase!.execute(req.body)
    return res.json({ success: true, ...result })
  }

  async editQueue(req: Request, res: Response) {
    await this.editGameQueueUseCase!.execute(req.body)
    return res.json({ success: true })
  }

  async findQueue(req: Request, res: Response) {
    const queueItem = await this.findGameQueueUseCase!.execute(req.params.id as string)
    return res.json(queueItem)
  }

  async findAllQueue(req: Request, res: Response) {
    const queueItems = await this.findAllGameQueueUseCase!.execute(req.params.id as string)
    return res.json(queueItems)
  }
}