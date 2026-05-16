import { mainGameTableId } from "./MainUUIDIds/uuidGeral"

type SeedPeculiarity = {
  id: string
  table_id: string
  name: string
  costPoints: number
  effect: string
}

export const  peculiarities: SeedPeculiarity[] = [
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Bad Temper',
    costPoints: -5,
    effect: '-2 reaction rolls when provoked.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Night Owl',
    costPoints: -5,
    effect: 'Harder to sleep at night, +1 alertness after midnight.'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Fragile Bones',
    costPoints: -10,
    effect: '+1 injury roll from falls and blunt trauma.'
  }
]