import { mainGameTableId } from "./MainUUIDIds/uuidGeral"
import { narration1, narration2, narration3 } from "./MainUUIDIds/uuidNarrations"
import { scenes } from "./varScenes"

type SeedNarration= {
  id: string
  table_id: string
  scene_id: string
  title: string
  narration: string
  moment: number
}

export const  narrations: SeedNarration[] = [
  {
    id: narration1,
    table_id: mainGameTableId,
    scene_id: scenes[0].id,
    title: 'The Forest', 
    narration: 'The party enters the forest.',
    moment: 0 
  },
  {
    id: narration2,
    table_id: mainGameTableId,
    scene_id: scenes[0].id, 
    title: 'The Clearing',
    narration: 'The party enters the forest.',
    moment: 1 
  },
  {
    id: narration3,
    table_id: mainGameTableId,
    scene_id: scenes[0].id, 
    title: 'The River',
    narration: 'The party enters the forest.',
    moment: 2 
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    scene_id: scenes[0].id, 
    title: 'The Mountain Pass',
    narration: 'The party enters the forest.',
    moment: 2 
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    scene_id: scenes[0].id, 
    title: 'The Mountain Pass',
    narration: 'The party enters the forest.',
    moment: 3 
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    scene_id: scenes[1].id, 
    title: 'The River',
    narration: 'The party enters the forest.',
    moment: 3 
  }
]