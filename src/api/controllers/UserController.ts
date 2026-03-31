import { Request , Response } from 'express'
import { CreateUserUseCase } from '../../application/use-cases/CreateUserUseCase'
import { FindAllUsersUseCase } from '../../application/use-cases/FindAllUsersUseCase'

export class UserController {
  constructor(private useCase: CreateUserUseCase , private findAllUsersUseCase: FindAllUsersUseCase) {}

  async create(req: Request, res: Response) {
    const user = await this.useCase.execute(req.body)
    return res.json(user)
  }

  async findAll(req: Request, res: Response) {
    const users = await this.findAllUsersUseCase.execute()
    return res.json(users)
  }
}