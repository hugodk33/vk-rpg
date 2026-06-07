import { Router } from 'express'
import { GameTableRulesRepository } from '../../../domain/repositories/GameTableRulesRepository'
import { characterViewer } from './templates'

const router = Router()
const repo = new GameTableRulesRepository()

router.get('/view/game-table-character/:id', async (req, res) => {
    
  try {
    const character = await repo.findGameCharacter(req.params.id)
    if (!character) {
      return res.status(404).send('Character not found')
    }
    res.send(characterViewer(character))
  } catch {
    res.status(500).send('Internal server error')
  }
})

export default router
