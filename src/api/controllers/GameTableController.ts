import { Request , Response } from 'express'
import { CreateGameTableUseCase } from '../../application/use-cases/tables-use-cases/CreateGameTableCase'
import { FindGameTableUseCase } from '../../application/use-cases/tables-use-cases/FindGameTableUseCase'
import { FindAllGameTablesUseCase } from '../../application/use-cases/tables-use-cases/FindAllGameTablesUseCase'
import { FindAllTableGameScenesUseCase } from '../../application/use-cases/tables-use-cases/FindAllTableGameScenesUseCase'

export class GameTableController {
  constructor(
    private createGameTableUseCase: CreateGameTableUseCase,
    private findGameTableUseCase: FindGameTableUseCase,
    private findAllGameTablesUseCase: FindAllGameTablesUseCase,
    private findAllTableGameScenesUseCase: FindAllTableGameScenesUseCase
  ) {}

  async create(req: Request, res: Response) {
    const user = await this.createGameTableUseCase.execute(req.body)
    return res.json(user)
  }

  async findById(req: Request, res: Response) {
    const gameTablesById = await this.findGameTableUseCase.execute(req.params.id as string) 
    return res.json(gameTablesById)
  }

  async findAll(req: Request, res: Response) {
    const gameAllTables = await this.findAllGameTablesUseCase.execute() 
    return res.json(gameAllTables) 
  }

  async findByAllScenes(req: Request, res: Response) {
    const gameTablesScenes = await this.findAllTableGameScenesUseCase.execute(req.params.id as string) 
    return res.json(gameTablesScenes)
  } 
}