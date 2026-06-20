import { mainGameTableId } from "./MainUUIDIds/uuidGeral"
import { narration1, narration2, narration3, narration4, narration5, narration6 } from "./MainUUIDIds/uuidNarrations"
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
    title: 'Meeting at the Shadowy Tankard',
    narration: 'The party gathers in a dim corner of the Shadowy Tankard tavern, where a cloaked guild agent slides a parchment across the table. Three people have vanished from the Ironmongers\' Alley in the past fortnight. The city watch has no leads. Payment: 200 gold upon resolution.',
    moment: 0
  },
  {
    id: narration2,
    table_id: mainGameTableId,
    scene_id: scenes[1].id,
    title: 'The Alley',
    narration: 'Ironmongers\' Alley reeks of damp stone and smoke from the nearby forges. Thick fog clings to the cobblestones as the party fans out to search for clues. A torn piece of fabric catches on a jagged iron hook — embroidered with a sigil the guild agent described.',
    moment: 0
  },
  {
    id: narration3,
    table_id: mainGameTableId,
    scene_id: scenes[1].id,
    title: 'Ambush!',
    narration: 'Before the party can examine the fabric further, heavy boots echo from both ends of the alley. Two figures emerge from the fog — Thorne Black and Riven Kael, blades drawn. It is a trap.',
    moment: 1
  },
  {
    id: narration4,
    table_id: mainGameTableId,
    scene_id: scenes[2].id,
    title: 'Into the Depths',
    narration: 'Behind a loose stone in the alley wall, the party discovers a hidden stairwell spiralling into darkness. The air grows thick and damp, carrying the scent of old earth and forgotten magic. Faint echoes suggest the tunnels are not as abandoned as they seem.',
    moment: 0
  },
  {
    id: narration5,
    table_id: mainGameTableId,
    scene_id: scenes[2].id,
    title: 'The Subterranean Crossing',
    narration: 'The tunnel opens into a wide chamber supported by crumbling stone pillars. A narrow stone bridge spans a dark chasm below. Strange glyphs glow faintly on the walls — not of dwarven or human origin.',
    moment: 1
  },
  {
    id: narration6,
    table_id: mainGameTableId,
    scene_id: scenes[3].id,
    title: 'The Temple Revealed',
    narration: 'Beyond the tunnels lies a vast underground temple, its architecture ancient and alien. At the centre, a pulsating crystal hovers above an altar — the source of the disappearances. Selene Voss stands before it, chanting in an unknown tongue.',
    moment: 0
  }
]