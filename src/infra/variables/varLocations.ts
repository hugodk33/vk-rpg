import { mainGameTableId } from "./MainUUIDIds/uuidGeral"
import { locationId1, locationId2, locationId3 } from "./MainUUIDIds/uuidLocation"

type SeedModifierLocation= {
  id: string
  table_id: string
  name: string
  region: string
  address: string
  sub_region: string
  is_indoor: number
  other: string
  country: string
  area: string
  dimensions: string
  description: string
}

export const  modifierTableLocations: SeedModifierLocation[] = [
  {
    id: locationId1,
    table_id: mainGameTableId,
    name: 'The Ironmongers\' Alley',
    region: 'Merchant Quarter',
    sub_region: 'Craftsman Row',
    address: 'Behind the Great Forge',
    is_indoor: 0,
    country: 'Valorian Empire',
    area: 'Narrow passage',
    dimensions: '40m x 3m',
    description: 'A cramped alley lined with blacksmith stalls and old tenements. The clang of hammers echoes through the fog. Perfect for ambushes.',
    other: 'Thick fog at dusk'
  },
  {
    id: locationId2,
    table_id: mainGameTableId,
    name: 'King\'s Market Square',
    region: 'Central District',
    sub_region: 'Commerce Hub',
    address: 'Main Plaza',
    is_indoor: 0,
    country: 'Valorian Empire',
    area: 'Open market',
    dimensions: '120m x 120m',
    description: 'A crowded marketplace full of merchants, guards, and noise. Ideal for social interactions and stealth.',
    other: 'High civilian density'
  },
  {
    id: locationId3,
    table_id: mainGameTableId,
    name: 'The Old Catacombs',
    region: 'Lower City',
    sub_region: 'Ancient Undercroft',
    address: 'Temple District entrance',
    is_indoor: 1,
    country: 'Valorian Empire',
    area: 'Underground tunnels',
    dimensions: 'Variable',
    description: 'Forgotten tunnels winding beneath the city, littered with old bones and the remnants of ancient rituals.',
    other: 'Foul air, risk of collapse'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'The Broken Tower',
    region: 'Old District',
    sub_region: 'Ruins',
    address: 'Hilltop Sector',
    is_indoor: 1,
    country: 'Valorian Empire',
    area: 'Ruined structure',
    dimensions: '60m height',
    description: 'An ancient collapsed tower rumored to hold magical remnants.',
    other: 'Unstable structure'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'The Royal Forge',
    region: 'Merchant Quarter',
    sub_region: 'Craftsman Row',
    address: 'Forge Street',
    is_indoor: 1,
    country: 'Valorian Empire',
    area: 'Workshop',
    dimensions: '20m x 15m',
    description: 'A hot and noisy forge filled with weapons, tools, and molten metal.',
    other: 'Extreme heat'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'City Watch Barracks',
    region: 'Central District',
    sub_region: 'Security Zone',
    address: 'Guard Avenue',
    is_indoor: 1,
    country: 'Valorian Empire',
    area: 'Military building',
    dimensions: '80m x 50m',
    description: 'Headquarters of the city guards, heavily patrolled and organized.',
    other: 'High security'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'The Shadowy Tankard',
    region: 'Lower City',
    sub_region: 'Dockside',
    address: 'Hidden stairway off Silver Street',
    is_indoor: 1,
    country: 'Valorian Empire',
    area: 'Tavern',
    dimensions: '25m x 20m',
    description: 'A dim, smoke-filled tavern where criminals and mercenaries gather away from prying eyes.',
    other: 'Frequented by the underworld'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Abandoned Storehouse',
    region: 'Dock District',
    sub_region: 'Storage Zone',
    address: 'Pier 9',
    is_indoor: 1,
    country: 'Valorian Empire',
    area: 'Storage building',
    dimensions: '100m x 70m',
    description: 'An empty storehouse with old crates and deep shadows — perfect for encounters.',
    other: 'Echoing acoustics'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'The Rooftops',
    region: 'Central District',
    sub_region: 'Upper Levels',
    address: 'Various buildings',
    is_indoor: 0,
    country: 'Valorian Empire',
    area: 'City rooftops',
    dimensions: 'Connected area',
    description: 'A dangerous network of rooftops ideal for chases and stealth movement.',
    other: 'Fall risk, loose tiles'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'The Arcane Library',
    region: 'Scholars Quarter',
    sub_region: 'Magic District',
    address: 'Knowledge Street',
    is_indoor: 1,
    country: 'Valorian Empire',
    area: 'Library',
    dimensions: '60m x 60m',
    description: 'A massive library containing forbidden knowledge and magical texts.',
    other: 'Magical interference'
  }
]