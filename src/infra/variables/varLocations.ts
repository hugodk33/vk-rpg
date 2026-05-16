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
    name: 'Iron Alley',
    region: 'Industrial District',
    sub_region: 'Backstreets',
    address: 'Sector 7, Alley 3',
    is_indoor: 0,
    country: 'Valorian Empire',
    area: 'Narrow street',
    dimensions: '40m x 3m',
    description: 'A tight alley filled with pipes, steam vents, and export const ant dripping water. Perfect for ambushes.',
    other: 'Low visibility due to steam'
  },
  {
    id: locationId2,
    table_id: mainGameTableId,
    name: 'Steel Market',
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
    name: 'Underground Sewers',
    region: 'Lower City',
    sub_region: 'Maintenance Tunnels',
    address: 'Access Gate 12',
    is_indoor: 1,
    country: 'Valorian Empire',
    area: 'Tunnel system',
    dimensions: 'Variable',
    description: 'Dark tunnels beneath the city with foul smell and dangerous footing.',
    other: 'Slippery terrain, disease risk'
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
    name: 'Blacksmith Forge',
    region: 'Industrial District',
    sub_region: 'Workshop Area',
    address: 'Forge Street 22',
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
    name: 'Shadow Tavern',
    region: 'Lower City',
    sub_region: 'Underground Social',
    address: 'Hidden Entrance',
    is_indoor: 1,
    country: 'Valorian Empire',
    area: 'Bar',
    dimensions: '25m x 20m',
    description: 'A dim tavern where criminals and mercenaries gather.',
    other: 'Illegal activities common'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Abandoned Warehouse',
    region: 'Dock District',
    sub_region: 'Storage Zone',
    address: 'Pier 9',
    is_indoor: 1,
    country: 'Valorian Empire',
    area: 'Storage building',
    dimensions: '100m x 70m',
    description: 'An empty warehouse with crates and shadows — perfect for encounters.',
    other: 'Echoing acoustics'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Rooftops of Steel',
    region: 'Central District',
    sub_region: 'Upper Levels',
    address: 'Various buildings',
    is_indoor: 0,
    country: 'Valorian Empire',
    area: 'Urban rooftops',
    dimensions: 'Connected area',
    description: 'A dangerous network of rooftops ideal for chases and stealth movement.',
    other: 'Fall risk'
  },
  {
    id: crypto.randomUUID(),
    table_id: mainGameTableId,
    name: 'Arcane Library',
    region: 'Scholars Quarter',
    sub_region: 'Magic District',
    address: 'Knowledge Street 1',
    is_indoor: 1,
    country: 'Valorian Empire',
    area: 'Library',
    dimensions: '60m x 60m',
    description: 'A massive library containing forbidden knowledge and magical texts.',
    other: 'Magical interference'
  }
]