import { Request , Response } from 'express'
import { CreateUserUseCase } from '../../application/use-cases/CreateUserUseCase'

export class UserController {
  constructor(private useCase: CreateUserUseCase) {}

  async create(req: Request, res: Response) {
    const user = await this.useCase.execute(req.body)
    return res.json(user)
  }
}