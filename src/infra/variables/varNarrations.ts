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
    title: 'Meeting at the Shadow Tavern',
    narration: 'The party gathers in a dimly lit corner of the Shadow Tavern, where a hooded guild agent slides a parchment across the table. Three people have vanished from the Iron Alley district in the past week. The city watch has no leads. Payment: 200 gold upon resolution.',
    moment: 0
  },
  {
    id: narration2,
    table_id: mainGameTableId,
    scene_id: scenes[1].id,
    title: 'The Alley',
    narration: 'Iron Alley reeks of coal smoke and rust. Steam vents hiss from cracked pipes as the party fans out to search for clues. A torn piece of fabric catches on a jagged metal beam — embroidered with a symbol the guild agent described.',
    moment: 0
  },
  {
    id: narration3,
    table_id: mainGameTableId,
    scene_id: scenes[1].id,
    title: 'Ambush!',
    narration: 'Before the party can examine the fabric further, heavy boots echo from both ends of the alley. Two figures emerge from the steam — Thorne Black and Riven Kael, blades drawn. It is a trap.',
    moment: 1
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    scene_id: scenes[2].id,
    title: 'Into the Depths',
    narration: 'Beneath a rusted grate in the alley floor, the party discovers a spiraling staircase leading into darkness. The air grows thick and damp. Faint echoes suggest the tunnels are not as abandoned as they seem.',
    moment: 0
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    scene_id: scenes[2].id,
    title: 'The Subterranean Crossing',
    narration: 'The tunnel opens into a wide chamber crisscrossed by old iron catwalks. A narrow bridge spans a dark chasm below. Strange glyphs glow faintly on the walls — not of dwarven or human origin.',
    moment: 1
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    scene_id: scenes[3].id,
    title: 'The Temple Revealed',
    narration: 'Beyond the tunnels lies a vast underground temple, its architecture ancient and alien. At the centre, a pulsating crystal hovers above an altar — the source of the disappearances. Selene Voss stands before it, chanting in an unknown tongue.',
    moment: 0
  }
]