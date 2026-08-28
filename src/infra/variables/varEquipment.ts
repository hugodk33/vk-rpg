import crypto from 'crypto'
import * as itemsIds from './MainUUIDIds/uuidItems'
import { characterGalarhornId, characterKaelId } from './MainUUIDIds/uuidCharacters'

/* =====================================================================
   character_equipment : ESTADO / EQUIPAMENTO do personagem
   Liga um item do "mundo" a um personagem: quem possui, quantidade,
   status (inventário/equipado/empunhado) e localização de equipamento.
   ===================================================================== */

type SeedEquipment = {
  id: string
  character_id: string
  item_id: string
  quantity: number
  status: string
  location: string
  rendered_st: number | null
}

export const characterEquipment: SeedEquipment[] = [
  // Elric Galarhorn (ST 11) — espada na mão direita, escudo na esquerda
  { id: crypto.randomUUID(), character_id: characterGalarhornId, item_id: itemsIds.shortSwordId, quantity: 1, status: 'wielded', location: 'right_hand', rendered_st: 11 },
  { id: crypto.randomUUID(), character_id: characterGalarhornId, item_id: itemsIds.mediumShieldId, quantity: 1, status: 'wielded', location: 'left_hand', rendered_st: null },
  { id: crypto.randomUUID(), character_id: characterGalarhornId, item_id: itemsIds.leatherArmorId, quantity: 1, status: 'equipped', location: 'torso', rendered_st: null },

  // Kael Shadowstep (ST 10) — facas no inventário + armadura
  { id: crypto.randomUUID(), character_id: characterKaelId, item_id: itemsIds.daggerId, quantity: 2, status: 'in_inventory', location: 'none', rendered_st: null },
  { id: crypto.randomUUID(), character_id: characterKaelId, item_id: itemsIds.kaelLeatherArmorId, quantity: 1, status: 'equipped', location: 'torso', rendered_st: null }
]
