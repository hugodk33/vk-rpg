import * as NPCIds from "./MainUUIDIds/uuidNPC"
import { narration1, narration2, narration3, narration4, narration5, narration6 } from "./MainUUIDIds/uuidNarrations"
import { characterGalarhornId, characterLyraId, characterKaelId, characterNPCsIds } from "./MainUUIDIds/uuidCharacters"
import { locationId1, locationId3, locTempleId } from "./MainUUIDIds/uuidLocation"

const  modifierFocusId = crypto.randomUUID()
const  modifierCurseId = crypto.randomUUID()

type SeedModifierNarrationActions = {
  id: string,
  narrations_id: string,
  queue: number,
  test: string,
  result: string,
  description: string,
  dice_roll: string,
  character_id: string,
  modificator: string,
  target: string | null,
  multitarget: boolean,
  location_id?: string | null,
  q?: number | null,
  r?: number | null,
  facing?: number | null,
}

export const  modifierNarrationsActions: SeedModifierNarrationActions[] = [
  {
    id: crypto.randomUUID(),
    narrations_id: narration1,
    queue: 1,
    test: '14',
    result: '12',
    description: 'Elric studied the guild parchment, memorising every detail of the missing persons report',
    dice_roll: '3d6 [ 6 , 4 , 2 ]',
    character_id: characterGalarhornId,
    modificator: '+3',
    target: null,
    multitarget: false,
  },
  {
    id: crypto.randomUUID(),
    narrations_id: narration1,
    queue: 2,
    test: '12',
    result: '10',
    description: 'The guild agent cautioned the party about a cloaked figure seen lurking near Ironmongers\' Alley',
    dice_roll: '3d6 [ 4 , 3 , 3 ]',
    character_id: characterNPCsIds[4] as string,
    modificator: '+1',
    target: null,
    multitarget: false,
  },
  {
    id: crypto.randomUUID(),
    narrations_id: narration1,
    queue: 3,
    test: '15',
    result: '16',
    description: 'Lyra Moonwhisper whispered a divination cantrip and detected faint magical residue on the parchment',
    dice_roll: '3d6 [ 6 , 5 , 5 ]',
    character_id: characterLyraId,
    modificator: '+5',
    target: null,
    multitarget: false,
  },
  {
    id: crypto.randomUUID(),
    narrations_id: narration2,
    queue: 1,
    test: '14',
    result: '13',
    description: 'Kael Shadowstep scaled the wall and retrieved the torn fabric, studying the embroidered sigil',
    location_id: locationId1,
    q: 15,
    r: 2,
    facing: 0,
    dice_roll: '3d6 [ 5 , 4 , 4 ]',
    character_id: characterKaelId,
    modificator: '+4',
    target: null,
    multitarget: false,
  },
  {
    id: crypto.randomUUID(),
    narrations_id: narration2,
    queue: 2,
    test: '12',
    result: '9',
    description: 'Thorne Black observed the party from a shuttered window, hand resting on his sword hilt',
    location_id: locationId1,
    q: 30,
    r: 1,
    facing: 3,
    dice_roll: '3d6 [ 3 , 3 , 3 ]',
    character_id: characterNPCsIds[1] as string,
    modificator: '+2',
    target: null,
    multitarget: false,
  },
  {
    id: crypto.randomUUID(),
    narrations_id: narration2,
    queue: 3,
    test: '13',
    result: '14',
    description: 'Elric compared the sigil to marks from old wanted posters and confirmed a match with the Crimson Fang',
    location_id: locationId1,
    q: 12,
    r: 2,
    facing: 0,
    dice_roll: '3d6 [ 6 , 4 , 4 ]',
    character_id: characterGalarhornId,
    modificator: '+3',
    target: null,
    multitarget: false,
  },
  {
    id: crypto.randomUUID(),
    narrations_id: narration3,
    queue: 1,
    test: '14',
    result: '10',
    description: 'Elric parried Thorne\'s surprise strike and reposted with a low slash',
    location_id: locationId1,
    q: 12,
    r: 2,
    facing: 1,
    dice_roll: '3d6 [ 4 , 6 , 0 ]',
    character_id: characterGalarhornId,
    modificator: '+2',
    target: characterNPCsIds[1] as string,
    multitarget: false,
  },
  {
    id: crypto.randomUUID(),
    narrations_id: narration3,
    queue: 2,
    test: '13',
    result: '11',
    description: 'Thorne Black pressed the attack, driving Elric back with a series of heavy overhand blows',
    location_id: locationId1,
    q: 15,
    r: 2,
    facing: 3,
    dice_roll: '3d6 [ 5 , 3 , 3 ]',
    character_id: characterNPCsIds[1] as string,
    modificator: '+1',
    target: characterGalarhornId,
    multitarget: false,
  },
  {
    id: crypto.randomUUID(),
    narrations_id: narration3,
    queue: 3,
    test: '16',
    result: '16',
    description: 'Lyra hurled a blinding flash into Riven\'s face, forcing him to shield his eyes',
    location_id: locationId1,
    q: 10,
    r: 2,
    facing: 0,
    dice_roll: '3d6 [ 6 , 5 , 5 ]',
    character_id: characterLyraId,
    modificator: '+5',
    target: characterNPCsIds[0] as string,
    multitarget: false,
  },
  {
    id: crypto.randomUUID(),
    narrations_id: narration3,
    queue: 4,
    test: '14',
    result: '12',
    description: 'Riven Kael shook off the dazzle and hurled a poisoned dagger at Lyra',
    location_id: locationId1,
    q: 13,
    r: 2,
    facing: 3,
    dice_roll: '3d6 [ 4 , 4 , 4 ]',
    character_id: characterNPCsIds[0] as string,
    modificator: '+2',
    target: characterLyraId,
    multitarget: false,
  },
  {
    id: crypto.randomUUID(),
    narrations_id: narration3,
    queue: 5,
    test: '15',
    result: '13',
    description: 'Kael circled through the fog and drove his dagger deep into Thorne\'s flank',
    location_id: locationId1,
    q: 11,
    r: 2,
    facing: 0,
    dice_roll: '3d6 [ 5 , 5 , 3 ]',
    character_id: characterKaelId,
    modificator: '+4',
    target: characterNPCsIds[1] as string,
    multitarget: false,
  },
  {
    id: crypto.randomUUID(),
    narrations_id: narration3,
    queue: 6,
    test: '12',
    result: '8',
    description: 'Riven Kael grabbed the wounded Thorne and vanished into the mist',
    location_id: locationId1,
    q: 31,
    r: 1,
    facing: 0,
    dice_roll: '3d6 [ 3 , 2 , 3 ]',
    character_id: characterNPCsIds[0] as string,
    modificator: '0',
    target: characterNPCsIds[1] as string,
    multitarget: false,
  },
  {
    id: crypto.randomUUID(),
    narrations_id: narration4,
    queue: 1,
    test: '12',
    result: '10',
    description: 'Elric took point with shield raised as the party descended the spiral stairs into darkness',
    location_id: locationId3,
    q: 6,
    r: 15,
    facing: 0,
    dice_roll: '3d6 [ 4 , 3 , 3 ]',
    character_id: characterGalarhornId,
    modificator: '+2',
    target: null,
    multitarget: false,
  },
  {
    id: crypto.randomUUID(),
    narrations_id: narration4,
    queue: 2,
    test: '10',
    result: '7',
    description: 'A pair of glowing eyes reflected torchlight from the tunnel ahead — a hulking figure blocked the passage',
    location_id: locationId3,
    q: 10,
    r: 15,
    facing: 3,
    dice_roll: '3d6 [ 3 , 2 , 2 ]',
    character_id: characterNPCsIds[5] as string,
    modificator: '-1',
    target: null,
    multitarget: false,
  },
  {
    id: crypto.randomUUID(),
    narrations_id: narration5,
    queue: 1,
    test: '14',
    result: '15',
    description: 'Kael tested the stone bridge with a careful step, the glyphs flaring with each footfall',
    location_id: locationId3,
    q: 16,
    r: 15,
    facing: 0,
    dice_roll: '3d6 [ 6 , 5 , 4 ]',
    character_id: characterKaelId,
    modificator: '+4',
    target: null,
    multitarget: false,
  },
  {
    id: crypto.randomUUID(),
    narrations_id: narration5,
    queue: 2,
    test: '16',
    result: '14',
    description: 'Nyx Shadowend emerged from behind a pillar and loosed an arrow at Kael from the darkness',
    location_id: locationId3,
    q: 12,
    r: 16,
    facing: 2,
    dice_roll: '3d6 [ 5 , 5 , 4 ]',
    character_id: characterNPCsIds[6] as string,
    modificator: '+5',
    target: characterKaelId,
    multitarget: false,
  },
  {
    id: crypto.randomUUID(),
    narrations_id: narration6,
    queue: 1,
    test: '18',
    result: '17',
    description: 'Selene Voss turned from the pulsating crystal, her hands crackling with shadowy energy as she chanted the final incantation',
    location_id: locTempleId,
    q: 1,
    r: 0,
    facing: 5,
    dice_roll: '3d6 [ 6 , 6 , 5 ]',
    character_id: characterNPCsIds[2] as string,
    modificator: '+5',
    target: null,
    multitarget: false,
  },
  {
    id: crypto.randomUUID(),
    narrations_id: narration6,
    queue: 2,
    test: '14',
    result: '12',
    description: 'Elric charged across the temple floor with sword drawn, shouting to shatter the mage\'s concentration',
    location_id: locTempleId,
    q: 1,
    r: 1,
    facing: 0,
    dice_roll: '3d6 [ 5 , 4 , 3 ]',
    character_id: characterGalarhornId,
    modificator: '+2',
    target: characterNPCsIds[2] as string,
    multitarget: false,
  },
]

type SeedModifierEntry = {
  id: string
  action_id: string
  character_id: string
  narration_id: string
  name: string
  description: string
  hp?: number
  st?: number
  dx?: number
  iq?: number
  ht?: number
  fatigue?: number
  mod_hp?: number
  mod_st?: number
  mod_dx?: number
  mod_iq?: number
  mod_ht?: number
  mod_fatigue?: number
  damage_value?: string
  skill_value?: string
  item_quantity?: number
  item_weight?: number
}

export const modifierSeedEntries: SeedModifierEntry[] = [
  {
    id: crypto.randomUUID(),
    action_id: modifierNarrationsActions[2]!.id,
    character_id: characterLyraId,
    narration_id: narration1,
    name: 'Cantrip surge',
    description: 'Lyra channels residual arcane energy to recover spent fatigue',
    mod_fatigue: 1,
  },
  {
    id: crypto.randomUUID(),
    action_id: modifierNarrationsActions[6]!.id,
    character_id: characterNPCsIds[1] as string,
    narration_id: narration3,
    name: 'Slash wound',
    description: 'Elric landed a deep slash across Thorne\'s flank',
    mod_hp: -4,
  },
  {
    id: crypto.randomUUID(),
    action_id: modifierNarrationsActions[7]!.id,
    character_id: characterGalarhornId,
    narration_id: narration3,
    name: 'Blunt trauma',
    description: 'Thorne\'s heavy overhand blows bruised Elric through his guard',
    mod_hp: -3,
  },
  {
    id: crypto.randomUUID(),
    action_id: modifierNarrationsActions[8]!.id,
    character_id: characterNPCsIds[0] as string,
    narration_id: narration3,
    name: 'Dazzled',
    description: 'Lyra\'s blinding flash left Riven disoriented',
    mod_dx: -2,
  },
  {
    id: crypto.randomUUID(),
    action_id: modifierNarrationsActions[9]!.id,
    character_id: characterLyraId,
    narration_id: narration3,
    name: 'Dagger wound',
    description: 'Riven\'s poisoned dagger caught Lyra in the shoulder',
    mod_hp: -2,
  },
  {
    id: crypto.randomUUID(),
    action_id: modifierNarrationsActions[10]!.id,
    character_id: characterNPCsIds[1] as string,
    narration_id: narration3,
    name: 'Kidney stab',
    description: 'Kael\'s dagger drove deep into Thorne\'s kidney',
    mod_hp: -5,
  },
  {
    id: crypto.randomUUID(),
    action_id: modifierNarrationsActions[15]!.id,
    character_id: characterKaelId,
    narration_id: narration5,
    name: 'Arrow wound',
    description: 'Nyx\'s arrow pierced Kael\'s shoulder',
    mod_hp: -3,
  },
]

type SeedModifierNarrationCharacter= {
  id: string
  character_id: string
  narrations_id: string
  conscious?: boolean
  q?: number | null
  r?: number | null
  facing?: number | null
}

export const  modifierNarrationsCharacters: SeedModifierNarrationCharacter[] = [
  {
    id: crypto.randomUUID(),
    character_id: characterGalarhornId,
    narrations_id: narration1,
    conscious: true,
    q: null,
    r: null,
    facing: null
  },
  {
    id: crypto.randomUUID(),
    character_id: characterLyraId,
    narrations_id: narration1,
    conscious: true,
    q: null,
    r: null,
    facing: null
  },
  {
    id: crypto.randomUUID(),
    character_id: characterKaelId,
    narrations_id: narration1,
    conscious: true,
    q: null,
    r: null,
    facing: null
  },
  {
    id: crypto.randomUUID(),
    character_id: characterGalarhornId,
    narrations_id: narration2,
    conscious: true,
    q: 12,
    r: 2,
    facing: 3
  },
  {
    id: crypto.randomUUID(),
    character_id: characterLyraId,
    narrations_id: narration2,
    conscious: true,
    q: 10,
    r: 2,
    facing: 3
  },
  {
    id: crypto.randomUUID(),
    character_id: characterKaelId,
    narrations_id: narration2,
    conscious: true,
    q: 14,
    r: 2,
    facing: 3
  },
  {
    id: crypto.randomUUID(),
    character_id: characterGalarhornId,
    narrations_id: narration3,
    conscious: true,
    q: 12,
    r: 2,
    facing: 1
  },
  {
    id: crypto.randomUUID(),
    character_id: characterLyraId,
    narrations_id: narration3,
    conscious: true,
    q: 10,
    r: 2,
    facing: 0
  },
  {
    id: crypto.randomUUID(),
    character_id: characterKaelId,
    narrations_id: narration3,
    conscious: true,
    q: 11,
    r: 2,
    facing: 0
  },
  {
    id: crypto.randomUUID(),
    character_id: characterGalarhornId,
    narrations_id: narration4,
    conscious: true,
    q: 5,
    r: 15,
    facing: 0
  },
  {
    id: crypto.randomUUID(),
    character_id: characterLyraId,
    narrations_id: narration4,
    conscious: true,
    q: 6,
    r: 14,
    facing: 1
  },
  {
    id: crypto.randomUUID(),
    character_id: characterKaelId,
    narrations_id: narration4,
    conscious: true,
    q: 4,
    r: 16,
    facing: 1
  },
  {
    id: crypto.randomUUID(),
    character_id: characterGalarhornId,
    narrations_id: narration5,
    conscious: true,
    q: 7,
    r: 15,
    facing: 0
  },
  {
    id: crypto.randomUUID(),
    character_id: characterLyraId,
    narrations_id: narration5,
    conscious: true,
    q: 8,
    r: 14,
    facing: 1
  },
  {
    id: crypto.randomUUID(),
    character_id: characterKaelId,
    narrations_id: narration5,
    conscious: true,
    q: 15,
    r: 15,
    facing: 0
  },
  {
    id: crypto.randomUUID(),
    character_id: characterGalarhornId,
    narrations_id: narration6,
    conscious: true,
    q: 0,
    r: 1,
    facing: 0
  },
  {
    id: crypto.randomUUID(),
    character_id: characterLyraId,
    narrations_id: narration6,
    conscious: true,
    q: 1,
    r: 2,
    facing: 3
  },
  {
    id: crypto.randomUUID(),
    character_id: characterKaelId,
    narrations_id: narration6,
    conscious: true,
    q: 2,
    r: 2,
    facing: 3
  },
]

type SeedModifierNarrationNPCs= {
  id: string,
  narration_id: string,
  npc_id: string,
  q?: number | null,
  r?: number | null,
  facing?: number | null,
}

export const  modifierNarrationsNPCs: SeedModifierNarrationNPCs[] = [
  {
    id: crypto.randomUUID(),
    narration_id: narration1,
    npc_id: NPCIds.Npc5Id,
    q: null,
    r: null,
    facing: null
  },
  {
    id: crypto.randomUUID(),
    narration_id: narration2,
    npc_id: NPCIds.Npc1Id,
    q: 30,
    r: 1,
    facing: 4
  },
  {
    id: crypto.randomUUID(),
    narration_id: narration3,
    npc_id: NPCIds.Npc1Id,
    q: 30,
    r: 1,
    facing: 3
  },
  {
    id: crypto.randomUUID(),
    narration_id: narration3,
    npc_id: NPCIds.Npc2Id,
    q: 20,
    r: 1,
    facing: 3
  },
  {
    id: crypto.randomUUID(),
    narration_id: narration4,
    npc_id: NPCIds.Npc6Id,
    q: 10,
    r: 15,
    facing: 3
  },
  {
    id: crypto.randomUUID(),
    narration_id: narration5,
    npc_id: NPCIds.Npc7Id,
    q: 12,
    r: 16,
    facing: 2
  },
  {
    id: crypto.randomUUID(),
    narration_id: narration6,
    npc_id: NPCIds.Npc3Id,
    q: 1,
    r: 0,
    facing: 5
  },
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
    narrations_id: narration4
  },
  {
    id: crypto.randomUUID(),
    location_id: locationId3,
    narrations_id: narration5
  },
  {
    id: crypto.randomUUID(),
    location_id: locTempleId,
    narrations_id: narration6
  },
]