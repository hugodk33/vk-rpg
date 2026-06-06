import * as NPCIds from "./MainUUIDIds/uuidNPC"
import { narration1, narration2, narration3 } from "./MainUUIDIds/uuidNarrations"
import { characterGalarhornId, characterGarrickId, characterKasumiId } from "./MainUUIDIds/uuidCharacters"
import { locationId1, locationId2, locationId3 } from "./MainUUIDIds/uuidLocation"

const  modifierFocusId = crypto.randomUUID()
const  modifierCurseId = crypto.randomUUID()

type SeedModifierNarrationActions= {
  id: string,
  narrations_id: string,
  queue: number,
  test: string,
  result: string,
  description: string,
  dice_roll: string,
  character_id: string,
}

export const  modifierNarrationsActions: SeedModifierNarrationActions[] = [
  {
    id: crypto.randomUUID(),
    narrations_id: narration1,
    queue: 1,
    test: '12',
    result: '17',
    description: 'Garrick used the defense skill and failed',
    dice_roll: '3d6 [ 4 , 1 , 5 ]',
    character_id: characterGarrickId,
  },
  {
    id: crypto.randomUUID(),
    narrations_id: narration1,
    queue: 2,
    test: '',
    result: '',
    description: 'Kasumi did nothing',
    dice_roll: '3d6 [ 0 , 0 , 0 ]',
    character_id: characterKasumiId,
  },
  {
    id: crypto.randomUUID(),
    narrations_id: narration1,
    queue: 3,
    test: '9',
    result: '10',
    description: 'Mira used the attack skill and succeeded',
    dice_roll: '3d6 [ 7 , 1 , 4 ]',
    character_id: characterGalarhornId,
  },
  {
    id: crypto.randomUUID(),
    narrations_id: narration1,
    queue: 4,
    test: '10',
    result: '11',
    description: 'Mira used the attack skill again and succeeded',
    dice_roll: '3d6 [ 3 , 4 , 2 ]',
    character_id: characterGalarhornId,
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
    character_id: characterGalarhornId,
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