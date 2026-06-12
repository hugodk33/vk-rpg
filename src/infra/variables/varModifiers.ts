import * as NPCIds from "./MainUUIDIds/uuidNPC"
import { narration1, narration2, narration3 } from "./MainUUIDIds/uuidNarrations"
import { characterGalarhornId, characterLyraId, characterKaelId } from "./MainUUIDIds/uuidCharacters"
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
    narrations_id: narration3,
    queue: 1,
    test: '14',
    result: '10',
    description: 'Elric parried Thorne\'s strike and counterattacked with his short sword',
    dice_roll: '3d6 [ 4 , 6 , 0 ]',
    character_id: characterGalarhornId,
  },
  {
    id: crypto.randomUUID(),
    narrations_id: narration3,
    queue: 2,
    test: '12',
    result: '9',
    description: 'Lyra cast a blinding flash at Riven, forcing him to cover his eyes',
    dice_roll: '3d6 [ 3 , 2 , 4 ]',
    character_id: characterLyraId,
  },
  {
    id: crypto.randomUUID(),
    narrations_id: narration3,
    queue: 3,
    test: '16',
    result: '13',
    description: 'Kael circled around the chaos and landed a precise dagger thrust on Thorne\'s flank',
    dice_roll: '3d6 [ 5 , 5 , 3 ]',
    character_id: characterKaelId,
  },
  {
    id: crypto.randomUUID(),
    narrations_id: narration3,
    queue: 4,
    test: '',
    result: '',
    description: 'Riven Kael retreated into the steam, dragging the wounded Thorne with him',
    dice_roll: '3d6 [ 0 , 0 , 0 ]',
    character_id: characterGalarhornId,
  },
  {
    id: crypto.randomUUID(),
    narrations_id: narration3,
    queue: 5,
    test: '10',
    result: '14',
    description: 'Elric attempted to pursue but lost them in the maze of pipes and steam vents',
    dice_roll: '3d6 [ 6 , 4 , 4 ]',
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
  },
  {
    id: crypto.randomUUID(),
    character_id: characterLyraId,
    narrations_id: narration1
  },
  {
    id: crypto.randomUUID(),
    character_id: characterKaelId,
    narrations_id: narration1
  },
  {
    id: crypto.randomUUID(),
    character_id: characterGalarhornId,
    narrations_id: narration3
  },
  {
    id: crypto.randomUUID(),
    character_id: characterLyraId,
    narrations_id: narration3
  },
  {
    id: crypto.randomUUID(),
    character_id: characterKaelId,
    narrations_id: narration3
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
    narration_id: narration3,
    npc_id: NPCIds.Npc1Id
  },
  {
    id: crypto.randomUUID(),
    narration_id: narration3,
    npc_id: NPCIds.Npc2Id
  },
  {
    id: crypto.randomUUID(),
    narration_id: narration3,
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
    location_id: locationId1,
    narrations_id: narration2
  },
  {
    id: crypto.randomUUID(),
    location_id: locationId1,
    narrations_id: narration3
  },
  {
    id: crypto.randomUUID(),
    location_id: locationId3,
    narrations_id: narration3
  }
]