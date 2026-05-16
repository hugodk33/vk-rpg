import { characterNPCsIds } from "./MainUUIDIds/uuidCharacters"
import * as characterId from './MainUUIDIds/uuidCharacters'

type SeedCharacterSheet = {
  id: string
  characterId: string
  name: string
  bio: string
  backstory: string
  points: number
  hp: number
  st: number
  dx: number
  iq: number
  ht: number
  fatigue: number
  encumbrance: string
}

export const  characterSheets: SeedCharacterSheet[] = [
  {
    id: crypto.randomUUID(),
    characterId: characterId.characterMiraId,
    name: 'Mira Thorne Sheet',
    bio: 'A streetwise duelist with quick reflexes.',
    backstory: 'Former city watch turned blade-for-hire, she fights for freedom and survival.',
    points: 150,
    hp: 11,
    st: 11,
    dx: 12,
    iq: 13,
    ht: 10,
    fatigue: 10,
    encumbrance: 'Light'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterId.characterGarrickId,
    name: 'Garrick Stone Sheet',
    bio: 'A hulking veteran whose strength keeps him alive.',
    backstory: 'A former soldier carrying the scars of many battles into the city.',
    points: 145,
    hp: 12,
    st: 12,
    dx: 11,
    iq: 10,
    ht: 11,
    fatigue: 11,
    encumbrance: 'Medium'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterId.characterKasumiId,
    name: 'Kasumi Noh Sheet',
    bio: 'A scholar whose magic is still growing.',
    backstory: 'Raised in a hidden tower, she now seeks her place among the city shadows.',
    points: 155,
    hp: 10,
    st: 9,
    dx: 13,
    iq: 14,
    ht: 10,
    fatigue: 10,
    encumbrance: 'Light'
  },
    {
    id: crypto.randomUUID(),
    characterId: characterNPCsIds[0] as string,
    name: 'Riven Kael Sheet',
    bio: 'A fast dual-blade fighter.',
    backstory: 'Survived by speed and instinct.',
    points: 150, hp: 11, st: 11, dx: 14, iq: 11, ht: 10, fatigue: 10, encumbrance: 'Light'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterNPCsIds[1] as string,
    name: 'Thorne Black Sheet',
    bio: 'A grim bounty hunter.',
    backstory: 'Tracks targets across kingdoms.',
    points: 155, hp: 12, st: 12, dx: 12, iq: 11, ht: 11, fatigue: 11, encumbrance: 'Medium'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterNPCsIds[2] as string,
    name: 'Selene Voss Sheet',
    bio: 'A shadow mage.',
    backstory: 'Manipulates darkness itself.',
    points: 160, hp: 10, st: 9, dx: 12, iq: 15, ht: 10, fatigue: 12, encumbrance: 'Light'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterNPCsIds[3] as string,
    name: 'Kael Draven Sheet',
    bio: 'A ruthless duelist.',
    backstory: 'Seeks perfection in combat.',
    points: 150, hp: 11, st: 11, dx: 13, iq: 11, ht: 11, fatigue: 10, encumbrance: 'Light'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterNPCsIds[4] as string,
    name: 'Lyra Moonfall Sheet',
    bio: 'A celestial sorcerer.',
    backstory: 'Gifted by ancient stars.',
    points: 165, hp: 10, st: 9, dx: 11, iq: 15, ht: 11, fatigue: 13, encumbrance: 'Light'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterNPCsIds[5] as string,
    name: 'Borin Stonehelm Sheet',
    bio: 'A dwarven tank.',
    backstory: 'Unbreakable in battle.',
    points: 160, hp: 14, st: 14, dx: 10, iq: 10, ht: 13, fatigue: 12, encumbrance: 'Heavy'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterNPCsIds[6] as string,
    name: 'Nyx Shadowend Sheet',
    bio: 'An elite assassin.',
    backstory: 'Never seen, always lethal.',
    points: 155, hp: 10, st: 10, dx: 15, iq: 12, ht: 10, fatigue: 10, encumbrance: 'Light'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterNPCsIds[7] as string,
    name: 'Eldric Vale Sheet',
    bio: 'A wise mage.',
    backstory: 'Keeper of forbidden lore.',
    points: 170, hp: 10, st: 9, dx: 10, iq: 16, ht: 11, fatigue: 13, encumbrance: 'Light'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterNPCsIds[8] as string,
    name: 'Vera Hollow Sheet',
    bio: 'A cursed archer.',
    backstory: 'Haunted by past battles.',
    points: 150, hp: 11, st: 11, dx: 13, iq: 11, ht: 11, fatigue: 10, encumbrance: 'Light'
  },
  {
    id: crypto.randomUUID(),
    characterId: characterNPCsIds[9] as string,
    name: 'Dante Crowe Sheet',
    bio: 'A charismatic warlock.',
    backstory: 'Power at a terrible cost.',
    points: 165, hp: 10, st: 10, dx: 11, iq: 15, ht: 11, fatigue: 12, encumbrance: 'Light'
  }
]