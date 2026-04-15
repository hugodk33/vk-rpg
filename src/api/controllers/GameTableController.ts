import { Request , Response } from 'express'
import { CreateGameTableUseCase } from '../../application/use-cases/CreateGameTableCase'
import { FindGameTableUseCase } from '../../application/use-cases/FindGameTableUseCase'
import { FindAllGameTablesUseCase } from '../../application/use-cases/FindAllGameTablesUseCase'

export class GameTableController {
  constructor(
    private useCase: CreateGameTableUseCase,
    private findGameTableUseCase: FindGameTableUseCase,
    private findAllGameTablesUseCase: FindAllGameTablesUseCase
  ) {}

  async create(req: Request, res: Response) {
    const user = await this.useCase.execute(req.body)
    return res.json(user)
  }

  async findById(req: Request, res: Response) {
    const gameTables = await this.findGameTableUseCase.execute(req.params.id as string) 
    return res.json(gameTables)
  }

  async findAll(req: Request, res: Response) {
    const gameTables = await this.findAllGameTablesUseCase.execute() 
    return res.json(gameTables) 
  }
}