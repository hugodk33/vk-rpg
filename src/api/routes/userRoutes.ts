import { Router } from 'express'

import { UserController } from '../controllers/UserController'
import { CreateUserUseCase } from '../../application/use-cases/users-use-cases/CreateUserUseCase'
import { UserRepository } from '../../domain/repositories/UserRepository'
import { NarratorRepository } from '../../domain/repositories/NarratorRepository'
import { FindAllUsersUseCase } from '../../application/use-cases/users-use-cases/FindAllUsersUseCase'

import { GameTableRepository } from '../../domain/repositories/GameTableRepository'
import { CreateGameTableUseCase } from '../../application/use-cases/tables-use-cases/CreateGameTableCase'
import { GameTableController } from '../controllers/GameTableController'
import { FindGameTableUseCase } from '../../application/use-cases/tables-use-cases/FindGameTableUseCase'
import { FindAllGameTablesUseCase } from '../../application/use-cases/tables-use-cases/FindAllGameTablesUseCase'
import { FindAllGameTableScenesUseCase } from '../../application/use-cases/tables-use-cases/FindAllGameTableScenesUseCase'
import { EditGameTableUseCase } from '../../application/use-cases/tables-use-cases/EditGameTableUseCase'

import { FindByStringUserUseCase } from '../../application/use-cases/tables-use-cases/FindByStringGameTableUseCase'
import { EditUsersUseCase } from '../../application/use-cases/users-use-cases/EditUsersUseCase'

import { GameTableRulesRepository } from '../../domain/repositories/GameTableRulesRepository'
import { FindGameTableSkillUseCase } from '../../application/use-cases/table-game-rules-use-case/FindGameTableSkillUseCase'
import { GameTableRulesController } from '../controllers/GameTableRulesController'
import { FindGameTableSkillsUseCase } from '../../application/use-cases/table-game-rules-use-case/FindAllGameTableSkillsUseCase'

import { FindGameTableAdvantagesUseCase } from '../../application/use-cases/table-game-rules-use-case/FindAllGameTableAdvantagesUseCase '
import { FindAllGameTableNPCSUseCase } from '../../application/use-cases/table-game-rules-use-case/FindAllGameTableNPCSUseCase'
import { FindGameTableItemsUseCase } from '../../application/use-cases/table-game-rules-use-case/FindAllGameTableItemsUseCase'
import { CreateGameTableAdvantagesUseCase } from '../../application/use-cases/table-game-rules-use-case/CreateGameTableAdvantagesUseCase'
import { EditGameTableAdvantagesUseCase } from '../../application/use-cases/table-game-rules-use-case/EditGameTableAdvantagesUseCase'
import { FindGameTableAdvantageUseCase } from '../../application/use-cases/table-game-rules-use-case/FindGameTableAdvantageUseCase'
import { FindGameTablePeculiarityUseCase } from '../../application/use-cases/table-game-rules-use-case/FindGameTablePeculiarityUseCase'
import { FindAllGameTablePeculiaritiesUseCase } from '../../application/use-cases/table-game-rules-use-case/FindAllGameTablePeculiaritiesUseCase'
import { CreateGameTablePeculiaritiesUseCase } from '../../application/use-cases/table-game-rules-use-case/CreateGameTablePeculiaritiesUseCase'
import { EditGameTablePeculiaritiesUseCase } from '../../application/use-cases/table-game-rules-use-case/EditGameTablePeculiaritiesUseCase'
import { FindGameTableItemUseCase } from '../../application/use-cases/table-game-rules-use-case/FindGameTableItemUseCase'
import { CreateGameTableItemsUseCase } from '../../application/use-cases/table-game-rules-use-case/CreateGameTableItemsUseCase'
import { EditGameTableItemsUseCase } from '../../application/use-cases/table-game-rules-use-case/EditGameTableItemsUseCase'
import { CreateGameTableNPCUseCase } from '../../application/use-cases/table-game-rules-use-case/CreateGameTableNPCUseCase'
import { EditGameTableNPCUseCase } from '../../application/use-cases/table-game-rules-use-case/EditGameTableNPCUseCase'
import { FindGameTableNPCUseCase } from '../../application/use-cases/table-game-rules-use-case/FindGameTableNPCUseCase'
import { CreateGameTableCharacterUseCase } from '../../application/use-cases/table-game-rules-use-case/CreateGameTableCharacterUseCase'
import { EditGameTableCharacterUseCase } from '../../application/use-cases/table-game-rules-use-case/EditGameTableCharacterUseCase'
import { FindGameTableCharacterUseCase } from '../../application/use-cases/table-game-rules-use-case/FindGameTableCharacterUseCase'
import { FindAllGameTableCharactersUseCase } from '../../application/use-cases/table-game-rules-use-case/FindAllGameTableCharactersUseCase'
import { FindGameTableNPCVisibilityUseCase } from '../../application/use-cases/table-game-rules-use-case/FindGameTableNPCVisibilityUseCase'
import { EditGameTableNPCVisibilityUseCase } from '../../application/use-cases/table-game-rules-use-case/EditGameTableNPCVisibilityUseCase'
import { CreateGameTableNPCVisibilityUseCase } from '../../application/use-cases/table-game-rules-use-case/CreateGameTableNPCVisibilityUseCase'

const router = Router()

const repo = new UserRepository()
const narratorRepo = new NarratorRepository()
const gameTableRepo = new GameTableRepository()
const gameTableRulesRepo = new GameTableRulesRepository()

/* USERS */
const findAllUsersUseCase = new FindAllUsersUseCase(repo)
const createUserUseCase = new CreateUserUseCase(repo, narratorRepo)
const findByStringUserUseCase = new FindByStringUserUseCase(repo)
const editUsersUseCase = new EditUsersUseCase(repo) 

/* ========== */
const userController = 
    new UserController(
        createUserUseCase, 
        findAllUsersUseCase , 
        findByStringUserUseCase, 
        editUsersUseCase
    );  

/* GAME TABLE */
const createGameTableUseCase = new CreateGameTableUseCase(gameTableRepo)
const findGameTableUseCase = new FindGameTableUseCase(gameTableRepo)
const findAllGameTablesUseCase = new FindAllGameTablesUseCase(gameTableRepo)
const findAllGameTableScenesUseCase = new FindAllGameTableScenesUseCase(gameTableRepo)
const editGameTableUseCase = new EditGameTableUseCase(gameTableRepo)
/* ========== */
const gameTableController = new GameTableController(createGameTableUseCase, findGameTableUseCase , findAllGameTablesUseCase , findAllGameTableScenesUseCase, editGameTableUseCase)

/* GAME TABLE RULES*/
const findGameTableSkillsUseCase = new FindGameTableSkillUseCase(gameTableRulesRepo)   
const findAllGameTableSkillsUseCase = new FindGameTableSkillsUseCase(gameTableRulesRepo) 
const findGameTableAdvantageUseCase = new FindGameTableAdvantageUseCase(gameTableRulesRepo)
const findAllGameTableAdvantagesUseCase = new FindGameTableAdvantagesUseCase(gameTableRulesRepo)
const createGameTableAdvantagesUseCase = new CreateGameTableAdvantagesUseCase(gameTableRulesRepo)
const editGameTableAdvantagesUseCase = new EditGameTableAdvantagesUseCase(gameTableRulesRepo)
const findGameTablePeculiarityUseCase = new FindGameTablePeculiarityUseCase(gameTableRulesRepo)
const findAllGameTablePeculiaritiesUseCase = new FindAllGameTablePeculiaritiesUseCase(gameTableRulesRepo)
const createGameTablePeculiaritiesUseCase = new CreateGameTablePeculiaritiesUseCase(gameTableRulesRepo)
const editGameTablePeculiaritiesUseCase = new EditGameTablePeculiaritiesUseCase(gameTableRulesRepo)
const findGameTableItemUseCase = new FindGameTableItemUseCase(gameTableRulesRepo)
const createGameTableItemsUseCase = new CreateGameTableItemsUseCase(gameTableRulesRepo)
const editGameTableItemsUseCase = new EditGameTableItemsUseCase(gameTableRulesRepo)
const findAllGameTableItemsUseCase = new FindGameTableItemsUseCase(gameTableRulesRepo)
const findGameTableNPCSSingleUseCase = new FindGameTableNPCUseCase(gameTableRulesRepo)
const findAllGameNPCsUseCase = new FindAllGameTableNPCSUseCase(gameTableRulesRepo)
const createGameTableNPCSUseCase = new CreateGameTableNPCUseCase(gameTableRulesRepo)
const editGameTableNPCSUseCase = new EditGameTableNPCUseCase(gameTableRulesRepo)
const createGameTableCharacterUseCase = new CreateGameTableCharacterUseCase(gameTableRulesRepo)
const editGameTableCharacterUseCase = new EditGameTableCharacterUseCase(gameTableRulesRepo)
const findGameTableCharacterUseCase = new FindGameTableCharacterUseCase(gameTableRulesRepo)
const findAllGameTableCharactersUseCase = new FindAllGameTableCharactersUseCase(gameTableRulesRepo)
const createGameTableNPCVisibilityUseCase = new CreateGameTableNPCVisibilityUseCase(gameTableRulesRepo)
const editGameTableNPCVisibilityUseCase = new EditGameTableNPCVisibilityUseCase(gameTableRulesRepo)
const findGameTableNPCVisibilityUseCase = new FindGameTableNPCVisibilityUseCase(gameTableRulesRepo)

/* ========== */
const gameTableRulesController = new GameTableRulesController(
    findGameTableSkillsUseCase,
    findAllGameTableSkillsUseCase,
    findGameTableAdvantageUseCase,
    findAllGameTableAdvantagesUseCase,
    findGameTablePeculiarityUseCase,
    findAllGameTablePeculiaritiesUseCase,
    findGameTableItemUseCase,
    findAllGameTableItemsUseCase,
    findGameTableNPCSSingleUseCase,
    findAllGameNPCsUseCase,
    createGameTableAdvantagesUseCase,
    editGameTableAdvantagesUseCase,
    createGameTablePeculiaritiesUseCase,
    editGameTablePeculiaritiesUseCase,
    createGameTableItemsUseCase,
    editGameTableItemsUseCase,
    createGameTableNPCSUseCase,
    editGameTableNPCSUseCase,
    createGameTableNPCVisibilityUseCase,
    editGameTableNPCVisibilityUseCase,
    findGameTableNPCVisibilityUseCase,
    createGameTableCharacterUseCase,
    editGameTableCharacterUseCase,
    findGameTableCharacterUseCase,
    findAllGameTableCharactersUseCase)

/* ROUTES */
/* ===== USER ===== */
router.post('/create-user', (req, res) => userController.create(req, res))
router.get('/users', (req, res) => userController.findAll(req, res))
router.get('/users/search/:searchTerm', (req, res) => userController.findByString(req, res))
router.put('/users/edit/:id', (req, res) => userController.editUser(req, res))

/* ===== GAME TABLES ===== */
router.post('/create-game-table', (req, res) => gameTableController.create(req, res))
router.get('/game-tables', (req, res) => gameTableController.findAll(req, res))
router.get('/game-table/:id', (req, res) => gameTableController.findById(req, res))
router.get('/game-table-scenes/:id', (req, res) => gameTableController.findByAllScenes(req, res))
router.put('/game-table/edit/:id', (req, res) => gameTableController.editGameTable(req, res))

router.get('/game-table-skills/:id', (req, res) => gameTableRulesController.findAllSkills(req, res))
router.get('/game-table-advantages/:id', (req, res) => gameTableRulesController.findAllAdvantages(req, res))
router.get('/game-table-peculiarities/:id', (req, res) => gameTableRulesController.findAllPeculiarities(req, res))
router.get('/game-table-items/:id', (req, res) => gameTableRulesController.findAllItems(req, res))
router.get('/game-table-npcs/:id', (req, res) => gameTableRulesController.findAllNPCS(req, res))
router.get('/game-table-npc/:id', (req, res) => gameTableRulesController.findNPC(req, res))

router.post('/game-table-character', (req, res) => gameTableRulesController.createCharacter(req, res))
router.put('/game-table-character', (req, res) => gameTableRulesController.editCharacter(req, res))
router.get('/game-table-character/:id', (req, res) => gameTableRulesController.findCharacter(req, res))
router.get('/game-table-characters/:id', (req, res) => gameTableRulesController.findAllCharacters(req, res))

export default router