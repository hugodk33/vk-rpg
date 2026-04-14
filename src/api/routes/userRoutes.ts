import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { CreateUserUseCase } from '../../application/use-cases/CreateUserUseCase'
import { UserRepository } from '../../domain/repositories/UserRepository'
import { GameTableRepository } from '../../domain/repositories/GameTableRepository'
import { CreateGameTableUseCase } from '../../application/use-cases/CreateGameTableCase'
import { GameTableController } from '../controllers/GameTableController'
import { NarratorRepository } from '../../domain/repositories/NarratorRepository'
import { FindAllUsersUseCase } from '../../application/use-cases/FindAllUsersUseCase'

const router = Router()

const repo = new UserRepository()
const narratorRepo = new NarratorRepository()
const gameTableRepo = new GameTableRepository()

/* USERS */
const findAllUsersUseCase = new FindAllUsersUseCase(repo)
const createUserUseCase = new CreateUserUseCase(repo, narratorRepo)
const userController = new UserController(createUserUseCase, findAllUsersUseCase);

/* GAME TABLE */
const createGameTableUseCase = new CreateGameTableUseCase(gameTableRepo)
const gameTableController = new GameTableController(createGameTableUseCase)


/* ROUTES */

router.post('/create-user', (req, res) => userController.create(req, res))
router.get('/users', (req, res) => userController.findAll(req, res))

router.post('/create-game-table', (req, res) => gameTableController.create(req, res))

export default router