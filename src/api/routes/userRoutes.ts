import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { CreateUserUseCase } from '../../application/use-cases/CreateUserUseCase'
import { SqliteUserRepository } from '../../domain/repositories/SqliteUserRepository'

const router = Router()

const repo = new SqliteUserRepository()
const useCase = new CreateUserUseCase(repo)
const controller = new UserController(useCase)

router.post('/users', (req, res) => controller.create(req, res))

export default router