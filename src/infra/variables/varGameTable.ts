import crypto from 'crypto'



import { mainGameTableId , adminId } from './MainUUIDIds/uuidGeral'

import { users } from './varUsers'
import { characterMiraId, characterGarrickId, characterKasumiId, characterNPCsIds } from "./MainUUIDIds/uuidCharacters"
import { shortSwordId, leatherArmorId, bowId } from "./MainUUIDIds/uuidItems"
import { locationId1, locationId2, locationId3 } from "./MainUUIDIds/uuidLocation"
import { narration1, narration2, narration3 } from "./MainUUIDIds/uuidNarrations"
import * as skillsIds from './MainUUIDIds/uuidSkills'
import * as advantagesIds from "./MainUUIDIds/uuidAdvantages"
import * as NPCIds from "./MainUUIDIds/uuidNPC"

type SeedNarrator = {
  id: string
  userId: string
  name: string
}

export const  narrators: SeedNarrator[] = [
  {
    id: crypto.randomUUID(),
    userId: adminId,
    name: 'admin'
  }
]

const  narratorId = narrators[0]!.id

type SeedGameTable = {
  id: string
  title: string
  system: string
  narratorId: string
  intro: string
}

export const  gameTables: [SeedGameTable, SeedGameTable, SeedGameTable] = [
  {
    id: mainGameTableId,
    narratorId,
    title: 'City of Steel',
    system: 'GURPS',
    intro: 'A gritty urban fantasy table with three player characters.'
  },
  {
    id: crypto.randomUUID(),
    narratorId,
    title: 'Jungle Expedition',
    system: 'GURPS',
    intro: 'A two-player exploration game with survival challenges.'
  },
  {
    id: crypto.randomUUID(),
    narratorId,
    title: 'Admin Sandbox',
    system: 'GURPS',
    intro: 'A test table for admin scenes.'
  }
]

type SeedGameTablePlayer = {
  id: string
  tableId: string
  userId: string
}

export const  gameTablePlayers: SeedGameTablePlayer[] = [
  { id: crypto.randomUUID(), tableId: mainGameTableId, userId: users[1].id },
  { id: crypto.randomUUID(), tableId: mainGameTableId, userId: users[2].id },
  { id: crypto.randomUUID(), tableId: mainGameTableId, userId: users[3].id },
  { id: crypto.randomUUID(), tableId: gameTables[1].id, userId: users[4].id },
  { id: crypto.randomUUID(), tableId: gameTables[1].id, userId: users[5].id }
]

type SeedModifier = {
  id: string
  tableId: string
  name: string
  duration: string
}

const  modifierFocusId = crypto.randomUUID()
const  modifierCurseId = crypto.randomUUID()

export const  modifiers: SeedModifier[] = [
  {
    id: modifierFocusId,
    tableId: mainGameTableId,
    name: 'Battle Focus',
    duration: 'Scene'
  },
  {
    id: modifierCurseId,
    tableId: mainGameTableId,
    name: 'Curse of Clumsiness',
    duration: 'Scene'
  }
]

type SeedModifierAttribute = {
  id: string
  modifierId: string
  attribute: string
}

export const  modifierAttributes: SeedModifierAttribute[] = [
  {
    id: crypto.randomUUID(),
    modifierId: modifierFocusId,
    attribute: 'DX+1'
  },
  {
    id: crypto.randomUUID(),
    modifierId: modifierFocusId,
    attribute: 'HT+1'
  },
  {
    id: crypto.randomUUID(),
    modifierId: modifierCurseId,
    attribute: 'DX-2'
  }
]

type SeedModifierSkill = {
  id: string
  modifierId: string
  skillId: string
}

export const  modifierSkills: SeedModifierSkill[] = [
  {
    id: crypto.randomUUID(),
    modifierId: modifierFocusId,
    skillId: skillsIds.skillSwordsmanshipId
  },
  {
    id: crypto.randomUUID(),
    modifierId: modifierFocusId,
    skillId: skillsIds.skillTacticsId
  },
  {
    id: crypto.randomUUID(),
    modifierId: modifierCurseId,
    skillId: skillsIds.skillStealthId
  }
]

type SeedModifierAdvantage = {
  id: string
  modifierId: string
  advantageId: string
}

export const  modifierAdvantages: SeedModifierAdvantage[] = [
  {
    id: crypto.randomUUID(),
    modifierId: modifierFocusId,
    advantageId: advantagesIds.advantageCombatReflexesId
  }
]

type SeedModifierItem = {
  id: string
  modifierId: string
  itemId: string
}

export const  modifierItems: SeedModifierItem[] = [
  {
    id: crypto.randomUUID(),
    modifierId: modifierFocusId,
    itemId: shortSwordId
  },
  {
    id: crypto.randomUUID(),
    modifierId: modifierCurseId,
    itemId: leatherArmorId
  }
]

type SeedModifierNarrationActions= {
  id: string,
  narrations_id: string,
  value: string,
  test: string,
  description: string,
  dice_roll: string,
  character_id: string,
}

export const  modifierNarrationsActions: SeedModifierNarrationActions[] = [
  {
    id: crypto.randomUUID(),
    narrations_id: narration1,
    value: '10',
    test: '9',
    description: 'Mira used the attack skill and succeeded',
    dice_roll: '3d6 [ 7 , 1 , 4 ]',
    character_id: characterMiraId,
  },
  {
    id: crypto.randomUUID(),
    narrations_id: narration1,
    value: '17',
    test: '12',
    description: 'Garrick used the defense skill and failed',
    dice_roll: '3d6 [ 4 , 1 , 5 ]',
    character_id: characterGarrickId,
  },
  {
    id: crypto.randomUUID(),
    narrations_id: narration1,
    value: '',
    test: '',
    description: 'Kasumi did nothing',
    dice_roll: '3d6 [ 0 , 0 , 0 ]',
    character_id: characterKasumiId,
  },
  {
    id: crypto.randomUUID(),
    narrations_id: narration1,
    value: '11',
    test: '10',
    description: 'Mira used the attack skill again and succeeded',
    dice_roll: '3d6 [ 3 , 4 , 2 ]',
    character_id: characterMiraId,
  }
]

type SeedModifierNarrationCharacter= {
  id: string
  character_id: string
  narrations_id: string
}

export const  modifierNarrationsCharacters: SeedModifierNarrationCharacter[] = [
  {
    id: crypto.randomUUID(),
    character_id: characterMiraId,
    narrations_id: narration1
  },
  {
    id: crypto.randomUUID(),
    character_id: characterGarrickId,
    narrations_id: narration1
  },
  {
    id: crypto.randomUUID(),
    character_id: characterKasumiId,
    narrations_id: narration1
  }
]

type SeedModifierNarrationNPCs= {
  id: string,
  narration_id: string,
  npc_id: string,
}

export const  modifierNarrationsNPCs: SeedModifierNarrationNPCs[] = [
  {
    id: crypto.randomUUID(),
    narration_id: narration1,
    npc_id: NPCIds.Npc1Id
  },
  {
    id: crypto.randomUUID(),
    narration_id: narration1,
    npc_id: NPCIds.Npc2Id
  },
  {
    id: crypto.randomUUID(),
    narration_id: narration1,
    npc_id: NPCIds.Npc3Id
  }
]

type SeedModifierNarrationLocations= {
  id: string,
  location_id: string,
  narrations_id: string,
}

export const  modifierNarrationsLocations: SeedModifierNarrationLocations[] = [
  {
    id: crypto.randomUUID(),
    location_id: locationId1,
    narrations_id: narration1
  },
  {
    id: crypto.randomUUID(),
    location_id: locationId2,
    narrations_id: narration2
  },
  {
    id: crypto.randomUUID(),
    location_id: locationId3,
    narrations_id: narration3
  }  
]