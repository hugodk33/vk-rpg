import { Request , Response } from 'express'
import { CreateGameTableUseCase } from '../../application/use-cases/CreateGameTableCase'

export class GameTableController {
  constructor(private useCase: CreateGameTableUseCase) {}

  async create(req: Request, res: Response) {
    const user = await this.useCase.execute(req.body)
    return res.json(user)
  }

}