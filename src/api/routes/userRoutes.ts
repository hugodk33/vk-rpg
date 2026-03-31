import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { CreateUserUseCase } from '../../application/use-cases/CreateUserUseCase'
import { SqliteUserRepository } from '../../domain/repositories/SqliteUserRepository'
import { FindAllUsersUseCase } from '../../application/use-cases/FindAllUsersUseCase'

const router = Router()

const repo = new SqliteUserRepository()
const createUserUseCase = new CreateUserUseCase(repo);
const findAllUsersUseCase = new FindAllUsersUseCase(repo);

const userController = new UserController(createUserUseCase, findAllUsersUseCase);

router.post('/create-user', (req, res) => userController.create(req, res))
router.get('/users', (req, res) => userController.findAll(req, res))

export default router