import { Router } from 'express'
import { GameTableRulesRepository } from '../../../domain/repositories/GameTableRulesRepository'
import { GameTableRepository } from '../../../domain/repositories/GameTableRepository'
import { FindAllGameTablesUseCase } from '../../../application/use-cases/tables-use-cases/FindAllGameTablesUseCase'
import { FindAllGameTableScenesUseCase } from '../../../application/use-cases/tables-use-cases/FindAllGameTableScenesUseCase'
import { characterViewer } from './templates/character-viewer'
import { gameTableList } from './templates/game-table-list'
import { gameTableScenes } from './templates/game-table-scenes'

const router = Router()
const gameTableRepo = new GameTableRepository()
const findAllGameTablesUseCase = new FindAllGameTablesUseCase(gameTableRepo)
const findAllGameTableScenesUseCase = new FindAllGameTableScenesUseCase(gameTableRepo)
const charRepo = new GameTableRulesRepository()

router.get('/', async (req, res) => {
  try {
    const tables = await findAllGameTablesUseCase.execute()
    const search = (req.query.search as string || '').toLowerCase()
    const filtered = search
      ? tables.filter((t: any) =>
          t.title?.toLowerCase().includes(search) ||
          t.narrator?.username?.toLowerCase().includes(search) ||
          t.intro?.toLowerCase().includes(search)
        )
      : tables
    res.send(gameTableList(filtered, req.query.search as string || ''))
  } catch {
    res.status(500).send('Internal server error')
  }
})

router.get('/view/game_table_scenes/:id', async (req, res) => {
  try {
    const data = await findAllGameTableScenesUseCase.execute(req.params.id)
    res.send(gameTableScenes(data))
  } catch {
    res.status(500).send('Internal server error')
  }
})

router.get('/game-table-character-viewer/:id', async (req, res) => {
  try {
    const character = await charRepo.findGameCharacter(req.params.id)
    if (!character) {
      return res.status(404).send('Character not found')
    }
    res.send(characterViewer(character))
  } catch {
    res.status(500).send('Internal server error')
  }
})

export default router
