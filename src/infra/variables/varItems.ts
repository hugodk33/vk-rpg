import { mainGameTableId } from "./MainUUIDIds/uuidGeral"
import * as itemsIds from "./MainUUIDIds/uuidItems"
import { users } from "./varUsers"

type SeedItem = {
  id: string
  table_id: string
  name: string
  type: number
  category: string
  weight: number
  dimensions: string
  description: string
  quality: string
  condition: string
  holderId: string
  ownerId: string
  skillUserId: string
  skillLevel: string
}

export const  items: SeedItem[] = [
  {
    id: itemsIds.daggerId,
    table_id: mainGameTableId,
    name: 'Dagger',
    type: 1,
    category: 'Melee',
    weight: 1,
    dimensions: '10cm',
    description: 'A balanced steel Dagger for fast close combat.',
    quality: 'Fine',
    condition: 'Good',
    holderId: users[1].id,
    ownerId: users[1].id,
    skillUserId: users[1].id,
    skillLevel: 'Swordsmanship 15'
  },
  {
    id: itemsIds.shortSwordId,
    table_id: mainGameTableId,
    name: 'Short Sword',
    type: 1,
    category: 'Melee',
    weight: 3,
    dimensions: '30cm',
    description: 'A balanced steel short sword for fast close combat.',
    quality: 'Fine',
    condition: 'Good',
    holderId: users[1].id,
    ownerId: users[1].id,
    skillUserId: users[1].id,
    skillLevel: 'Swordsmanship 15'
  },
  {
    id: itemsIds.leatherArmorId,
    table_id: mainGameTableId,
    name: 'Leather Armor',
    type: 2,
    category: 'Armor',
    weight: 15,
    dimensions: 'Torso',
    description: 'Light leather armor that offers protection without limiting movement.',
    quality: 'Standard',
    condition: 'Worn',
    holderId: users[2].id,
    ownerId: users[2].id,
    skillUserId: users[2].id,
    skillLevel: 'Armor Use 12'
  },
    {
        id: itemsIds.bowId,
        table_id: mainGameTableId,
        name: 'Recurve Bow',
        type: 1,
        category: 'Ranged',
        weight: 4,
        dimensions: '1.2m',
        description: 'A recurved bow with excellent range for an archer.',
        quality: 'Good',
        condition: 'Excellent',
        holderId: users[3].id,
        ownerId: users[3].id,
        skillUserId: users[3].id,
        skillLevel: 'Bows 14'
    },
    {
        id: itemsIds.wizardStaffId,
        table_id: mainGameTableId,
        name: 'Wizard Staff',
        type: 1,
        category: 'Weapon',
        weight: 4,
        dimensions: '1.8m',
        description: 'A finely crafted wooden staff imbued with latent magical energy.',
        quality: 'Fine',
        condition: 'Good',
        holderId: users[4].id,
        ownerId: users[4].id,
        skillUserId: users[4].id,
        skillLevel: 'Thaumatology 16'
    },
    {
        id: itemsIds.spellbookId,
        table_id: mainGameTableId,
        name: 'Spellbook',
        type: 3,
        category: 'Equipment',
        weight: 3,
        dimensions: '30cm',
        description: 'A leather-bound tome containing arcane rituals and notes.',
        quality: 'Fine',
        condition: 'Good',
        holderId: users[4].id,
        ownerId: users[4].id,
        skillUserId: users[4].id,
        skillLevel: 'Research 15'
    },
    {
        id: itemsIds.robesId,
        table_id: mainGameTableId,
        name: 'Robes',
        type: 2,
        category: 'Armor',
        weight: 2,
        dimensions: 'Torso',
        description: 'Simple but durable wizard robes enchanted for comfort.',
        quality: 'Good',
        condition: 'Good',
        holderId: users[4].id,
        ownerId: users[4].id,
        skillUserId: users[4].id,
        skillLevel: ''
    },
    {
        id: itemsIds.potionBeltId,
        table_id: mainGameTableId,
        name: 'Potion Belt',
        type: 3,
        category: 'Equipment',
        weight: 2,
        dimensions: 'Waist',
        description: 'A belt with small pouches for carrying potions and reagents.',
        quality: 'Good',
        condition: 'Good',
        holderId: users[4].id,
        ownerId: users[4].id,
        skillUserId: users[4].id,
        skillLevel: 'Alchemy 14'
    },
    {
        id: itemsIds.fineDaggerId,
        table_id: mainGameTableId,
        name: 'Fine Dagger',
        type: 1,
        category: 'Melee',
        weight: 1,
        dimensions: '15cm',
        description: 'A razor-sharp dagger balanced for precise strikes.',
        quality: 'Fine',
        condition: 'Good',
        holderId: users[5].id,
        ownerId: users[5].id,
        skillUserId: users[5].id,
        skillLevel: 'Knife 16'
    },
    {
        id: itemsIds.throwingKnifeId,
        table_id: mainGameTableId,
        name: 'Throwing Knife',
        type: 1,
        category: 'Ranged',
        weight: 0.5,
        dimensions: '12cm',
        description: 'A lightweight knife designed for throwing accuracy.',
        quality: 'Good',
        condition: 'Good',
        holderId: users[5].id,
        ownerId: users[5].id,
        skillUserId: users[5].id,
        skillLevel: 'Knife 16'
    },
    {
        id: itemsIds.lockpickSetId,
        table_id: mainGameTableId,
        name: 'Lockpick Set',
        type: 3,
        category: 'Equipment',
        weight: 0.5,
        dimensions: '10cm',
        description: 'A professional set of lockpicks for opening locks.',
        quality: 'Fine',
        condition: 'Good',
        holderId: users[5].id,
        ownerId: users[5].id,
        skillUserId: users[5].id,
        skillLevel: 'Lockpicking 15'
    },
    {
        id: itemsIds.darkHoodedCloakId,
        table_id: mainGameTableId,
        name: 'Dark Hooded Cloak',
        type: 3,
        category: 'Clothing',
        weight: 2,
        dimensions: 'Full body',
        description: 'A dark, hooded cloak that helps blend into shadows.',
        quality: 'Good',
        condition: 'Good',
        holderId: users[5].id,
        ownerId: users[5].id,
        skillUserId: users[5].id,
        skillLevel: ''
    }
]