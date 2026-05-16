import crypto  from 'crypto'
import { mainGameTableId } from "./MainUUIDIds/uuidGeral"

type SeedScene= {
  id: string
  table_id: string
  title: string
  chapter: number
  moment: number
}

export const  scenes: [SeedScene ,  SeedScene , SeedScene , SeedScene ] = [
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    title: 'The Forest',
    chapter: 1,
    moment: 0,
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    title: 'The Clearing',
    chapter: 1,
    moment: 1,
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    title: 'The River',
    chapter: 1,
    moment: 2
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    title: 'The Mountain Pass',
    chapter: 1,
    moment: 3
  }
]