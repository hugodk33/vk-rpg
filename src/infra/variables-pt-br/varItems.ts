import { mainGameTableId } from "./MainUUIDIds/uuidGeral"
import * as itemsIds from "./MainUUIDIds/uuidItems"

/* =====================================================================
   SEED ITEMS (novo modelo GURPS)
   ----------------------------------------------------------------
   NÃO guardamos dano final de arma. A arma guarda PARÂMETROS:
     damage_source  -> como o dano é derivado (st_swing/st_thrust/fixed/...)
     damage_modifier-> inteiro somado à base (ex: SW+1 -> +1)
     damage_dice    -> só p/ dano fixo (ex: '2d')
     damage_type    -> tipo de dano GURPS (cut/imp/cr/pi/...)
   A engine combina com ST/THR/SW do personagem via gurps_damage_table.
   ===================================================================== */

type SeedItem = {
  id: string
  table_id: string
  name: string
  kind: string
  category: string
  weight_lb: number
  cost: number
  dimensions: string
  description: string
  quality: string
  condition: string
}

type SeedWeapon = {
  id: string
  item_id: string
  skill: string
  min_st: number | null
  rated_st: number | null
  handedness: number
  reach: string
  parry: string
  block: string | null
  fit: string
}

type SeedAttack = {
  id: string
  weapon_id: string
  name: string
  usage: string | null
  damage_source: string
  damage_modifier: number
  damage_dice: string | null
  damage_type: string
  armor_penetration: number
  accuracy: number | null
  range: string
  recoil: number | null
  shots: number | null
}

type SeedArmor = {
  id: string
  item_id: string
  dr: number
  flex: number
  locations: string
  fit: string
}

export const items: SeedItem[] = [
  {
    id: itemsIds.shortSwordId, table_id: mainGameTableId, name: 'Espada Curta',
    kind: 'weapon', category: 'Melee', weight_lb: 3, cost: 400,
    dimensions: '90cm', description: 'Uma espada curta de aço equilibrada para combate corpo a corpo rápido.',
    quality: 'fine', condition: 'new'
  },
  {
    id: itemsIds.handAxeId, table_id: mainGameTableId, name: 'Machado de Mão',
    kind: 'weapon', category: 'Melee', weight_lb: 2, cost: 40,
    dimensions: '45cm', description: 'Um machado versátil de uma mão.',
    quality: 'standard', condition: 'worn'
  },
  {
    id: itemsIds.daggerId, table_id: mainGameTableId, name: 'Adaga',
    kind: 'weapon', category: 'Melee', weight_lb: 1, cost: 20,
    dimensions: '25cm', description: 'Uma lâmina pequena para combate corpo a corpo rápido e arremesso.',
    quality: 'fine', condition: 'new'
  },
  {
    id: itemsIds.fineDaggerId, table_id: mainGameTableId, name: 'Adaga Fina',
    kind: 'weapon', category: 'Melee', weight_lb: 1, cost: 80,
    dimensions: '25cm', description: 'Uma adaga extremamente afiada, equilibrada para golpes precisos.',
    quality: 'very_fine', condition: 'new'
  },
  {
    id: itemsIds.throwingKnifeId, table_id: mainGameTableId, name: 'Faca de Arremesso',
    kind: 'weapon', category: 'Ranged', weight_lb: 0.5, cost: 15,
    dimensions: '20cm', description: 'Uma faca leve projetada para precisão no arremesso.',
    quality: 'fine', condition: 'new'
  },
  {
    id: itemsIds.mediumShieldId, table_id: mainGameTableId, name: 'Escudo Médio',
    kind: 'shield', category: 'Shield', weight_lb: 15, cost: 60,
    dimensions: '90cm', description: 'Um escudo de madeira reforçado com faixas de metal.',
    quality: 'standard', condition: 'worn'
  },
  {
    id: itemsIds.pistolId, table_id: mainGameTableId, name: 'Pistola (.45)',
    kind: 'weapon', category: 'Ranged', weight_lb: 2.4, cost: 600,
    dimensions: '22cm', description: 'Uma pistola pesada que dispara munição .45 ACP.',
    quality: 'standard', condition: 'new'
  },
  {
    id: itemsIds.recurveBowId, table_id: mainGameTableId, name: 'Arco Recurvo',
    kind: 'weapon', category: 'Ranged', weight_lb: 4, cost: 225,
    dimensions: '1.2m', description: 'Um arco recurvo com alcance excelente para um arqueiro.',
    quality: 'fine', condition: 'new'
  },
  {
    id: itemsIds.wizardStaffId, table_id: mainGameTableId, name: 'Cajado de Mago',
    kind: 'weapon', category: 'Melee', weight_lb: 4, cost: 7,
    dimensions: '1.8m', description: 'Um cajado de madeira finamente trabalhado, imbuído de energia mágica latente.',
    quality: 'fine', condition: 'worn'
  },
  {
    id: itemsIds.leatherArmorId, table_id: mainGameTableId, name: 'Armadura de Couro',
    kind: 'armor', category: 'Armor', weight_lb: 15, cost: 100,
    dimensions: 'Torso', description: 'Armadura de couro leve que protege sem limitar os movimentos.',
    quality: 'standard', condition: 'worn'
  },
  {
    id: itemsIds.galhornLeatherArmorId, table_id: mainGameTableId, name: 'Armadura de Couro',
    kind: 'armor', category: 'Armor', weight_lb: 18, cost: 120,
    dimensions: 'Torso', description: 'Armadura de couro resistente que oferece proteção moderada.',
    quality: 'fine', condition: 'good'
  },
  {
    id: itemsIds.leatherBracersId, table_id: mainGameTableId, name: 'Braceleiras de Couro',
    kind: 'armor', category: 'Armor', weight_lb: 2, cost: 30,
    dimensions: 'Arms', description: 'Protetores de antebraço de couro para proteção adicional.',
    quality: 'fine', condition: 'good'
  },
  {
    id: itemsIds.leatherBootsId, table_id: mainGameTableId, name: 'Botas de Couro',
    kind: 'armor', category: 'Armor', weight_lb: 3, cost: 40,
    dimensions: 'Legs', description: 'Botas de couro resistentes que protegem os pés e as pernas inferiores.',
    quality: 'fine', condition: 'good'
  },
  {
    id: itemsIds.kaelLeatherArmorId, table_id: mainGameTableId, name: 'Armadura de Couro',
    kind: 'armor', category: 'Armor', weight_lb: 12, cost: 100,
    dimensions: 'Torso', description: 'Armadura de couro leve otimizada para furtividade e mobilidade.',
    quality: 'fine', condition: 'good'
  },
  {
    id: itemsIds.robesId, table_id: mainGameTableId, name: 'Vestes',
    kind: 'armor', category: 'Clothing', weight_lb: 6, cost: 30,
    dimensions: 'Full Body', description: 'Vestes de mago simples mas duráveis, encantadas para conforto.',
    quality: 'standard', condition: 'good'
  },
  {
    id: itemsIds.spellbookId, table_id: mainGameTableId, name: 'Grimório',
    kind: 'equipment', category: 'Equipment', weight_lb: 3, cost: 400,
    dimensions: '30cm', description: 'Um tomo encadernado em couro contendo rituais arcanos e anotações.',
    quality: 'fine', condition: 'good'
  },
  {
    id: itemsIds.potionBeltId, table_id: mainGameTableId, name: 'Cinto de Poções',
    kind: 'equipment', category: 'Equipment', weight_lb: 2, cost: 25,
    dimensions: 'Waist', description: 'Um cinto com bolsos pequenos para carregar poções e reagentes.',
    quality: 'fine', condition: 'good'
  },
  {
    id: itemsIds.lockpickSetId, table_id: mainGameTableId, name: 'Kit de Gazuas',
    kind: 'equipment', category: 'Equipment', weight_lb: 0.5, cost: 50,
    dimensions: '10cm', description: 'Um conjunto profissional de gazuas para abrir fechaduras.',
    quality: 'fine', condition: 'good'
  },
  {
    id: itemsIds.darkHoodedCloakId, table_id: mainGameTableId, name: 'Capa Escura com Capuz',
    kind: 'equipment', category: 'Clothing', weight_lb: 2, cost: 50,
    dimensions: 'Full body', description: 'Uma capa escura com capuz que ajuda a se misturar com as sombras.',
    quality: 'fine', condition: 'good'
  },
  {
    id: itemsIds.travelCloakId, table_id: mainGameTableId, name: 'Capa de Viagem',
    kind: 'equipment', category: 'Clothing', weight_lb: 2, cost: 15,
    dimensions: 'Shoulders', description: 'Uma capa de viagem simples para proteção contra o clima.',
    quality: 'standard', condition: 'good'
  },
  // ---- Mage items (Lyra & Kael) ----
  {
    id: itemsIds.arcanistStaffId, table_id: mainGameTableId, name: 'Cajado Arcano',
    kind: 'weapon', category: 'Melee', weight_lb: 4, cost: 60,
    dimensions: '1.8m', description: 'Um cajado talhado em madeira anciã, zumbindo com a carga arcanã armazenada.',
    quality: 'fine', condition: 'good'
  },
  {
    id: itemsIds.arcaneDaggerId, table_id: mainGameTableId, name: 'Adaga Arcana',
    kind: 'weapon', category: 'Melee', weight_lb: 0.75, cost: 300,
    dimensions: '28cm', description: 'Uma adaga gravada com runas que brilham quando o portador canaliza magia.',
    quality: 'very_fine', condition: 'new'
  },
  {
    id: itemsIds.arcaneFocusCrystalId, table_id: mainGameTableId, name: 'Cristal de Foco Arcano',
    kind: 'equipment', category: 'Equipment', weight_lb: 0.25, cost: 200,
    dimensions: '5cm', description: 'Um cristal do tamanho de um punho que ancora a projeção de feitiços e brilha fracamente na presença de magia.',
    quality: 'fine', condition: 'good'
  },
  {
    id: itemsIds.elixirMinorHealingId, table_id: mainGameTableId, name: 'Elixir de Cura Menor',
    kind: 'equipment', category: 'Consumable', weight_lb: 0.5, cost: 120,
    dimensions: '12cm', description: 'Um elixir vermelho brilhante que alivia feridas e restaura a energia gasta.',
    quality: 'fine', condition: 'new'
  },
  {
    id: itemsIds.shadowAmuletId, table_id: mainGameTableId, name: 'Amuleto das Sombras',
    kind: 'equipment', category: 'Clothing', weight_lb: 0.2, cost: 150,
    dimensions: 'Neck', description: 'Um amuleto enevoado que abafa os passos e oculta a presença mágica do portador.',
    quality: 'fine', condition: 'good'
  },
  {
    id: itemsIds.smokeBombPouchId, table_id: mainGameTableId, name: 'Bolsas de Bomba de Fumaça',
    kind: 'equipment', category: 'Equipment', weight_lb: 1, cost: 60,
    dimensions: 'Waist', description: 'Um bolso cheio de pequenos grãos que estouram em fumaça ocultadora.',
    quality: 'standard', condition: 'good'
  }
]

export const weapons: SeedWeapon[] = [
  {
    id: itemsIds.shortSwordWeaponId, item_id: itemsIds.shortSwordId,
    skill: 'Espada Curta', min_st: 7, rated_st: null, handedness: 1,
    reach: '1', parry: '0', block: null, fit: 'tailored'
  },
  {
    id: itemsIds.handAxeWeaponId, item_id: itemsIds.handAxeId,
    skill: 'Machado', min_st: 11, rated_st: null, handedness: 1,
    reach: '1', parry: '0U', block: null, fit: 'normal'
  },
  {
    id: itemsIds.daggerWeaponId, item_id: itemsIds.daggerId,
    skill: 'Faca', min_st: 5, rated_st: null, handedness: 1,
    reach: 'C', parry: '-1', block: null, fit: 'normal'
  },
  {
    id: itemsIds.mediumShieldWeaponId, item_id: itemsIds.mediumShieldId,
    skill: 'Escudo', min_st: null, rated_st: null, handedness: 1,
    reach: 'C', parry: 'No', block: '3', fit: 'normal'
  },
  {
    id: itemsIds.pistolWeaponId, item_id: itemsIds.pistolId,
    skill: 'Armas de Fogo (Pistola)', min_st: null, rated_st: null, handedness: 1,
    reach: 'C', parry: 'No', block: null, fit: 'normal'
  },
  {
    id: itemsIds.recurveBowWeaponId, item_id: itemsIds.recurveBowId,
    skill: 'Arco', min_st: 7, rated_st: 10, handedness: 2,
    reach: 'C', parry: 'No', block: null, fit: 'tailored'
  },
  {
    id: itemsIds.wizardStaffWeaponId, item_id: itemsIds.wizardStaffId,
    skill: 'Bastão', min_st: 5, rated_st: null, handedness: 2,
    reach: 'C,1', parry: '2', block: null, fit: 'normal'
  },
  {
    id: itemsIds.arcanistStaffWeaponId, item_id: itemsIds.arcanistStaffId,
    skill: 'Bastão', min_st: 6, rated_st: null, handedness: 2,
    reach: 'C,1', parry: '2', block: null, fit: 'tailored'
  },
  {
    id: itemsIds.arcaneDaggerWeaponId, item_id: itemsIds.arcaneDaggerId,
    skill: 'Faca', min_st: 5, rated_st: null, handedness: 1,
    reach: 'C', parry: '0', block: null, fit: 'normal'
  }
]

export const weaponAttacks: SeedAttack[] = [
  // Espada: Swing SW+1 CUT | Thrust THR IMP
  {
    id: itemsIds.shortSwordSwingId, weapon_id: itemsIds.shortSwordWeaponId,
    name: 'Golpe', usage: null, damage_source: 'st_swing', damage_modifier: 1,
    damage_dice: null, damage_type: 'cut', armor_penetration: 0,
    accuracy: null, range: 'Melee', recoil: null, shots: null
  },
  {
    id: itemsIds.shortSwordThrustId, weapon_id: itemsIds.shortSwordWeaponId,
    name: 'Estocada', usage: null, damage_source: 'st_thrust', damage_modifier: 0,
    damage_dice: null, damage_type: 'imp', armor_penetration: 0,
    accuracy: null, range: 'Melee', recoil: null, shots: null
  },
  // Machado: Swing SW+2 CUT | Thrust THR-1 IMP
  {
    id: itemsIds.handAxeSwingId, weapon_id: itemsIds.handAxeWeaponId,
    name: 'Golpe', usage: null, damage_source: 'st_swing', damage_modifier: 2,
    damage_dice: null, damage_type: 'cut', armor_penetration: 0,
    accuracy: null, range: 'Melee', recoil: null, shots: null
  },
  {
    id: itemsIds.handAxeThrustId, weapon_id: itemsIds.handAxeWeaponId,
    name: 'Estocada', usage: null, damage_source: 'st_thrust', damage_modifier: -1,
    damage_dice: null, damage_type: 'imp', armor_penetration: 0,
    accuracy: null, range: 'Melee', recoil: null, shots: null
  },
  // Faca: Swing SW-3 CUT | Thrust THR IMP
  {
    id: itemsIds.daggerSwingId, weapon_id: itemsIds.daggerWeaponId,
    name: 'Golpe', usage: null, damage_source: 'st_swing', damage_modifier: -3,
    damage_dice: null, damage_type: 'cut', armor_penetration: 0,
    accuracy: null, range: 'C', recoil: null, shots: null
  },
  {
    id: itemsIds.daggerThrustId, weapon_id: itemsIds.daggerWeaponId,
    name: 'Estocada', usage: null, damage_source: 'st_thrust', damage_modifier: 0,
    damage_dice: null, damage_type: 'imp', armor_penetration: 0,
    accuracy: null, range: 'C', recoil: null, shots: null
  },
  // Escudo: Bash base SW-2 CUT (apenas exemplo)
  {
    id: itemsIds.mediumShieldBashId, weapon_id: itemsIds.mediumShieldWeaponId,
    name: 'Golpe de Escudo', usage: null, damage_source: 'st_swing', damage_modifier: -2,
    damage_dice: null, damage_type: 'cr', armor_penetration: 0,
    accuracy: null, range: 'C', recoil: null, shots: null
  },
  // Pistola: dano fixo 2d+1 PI
  {
    id: itemsIds.pistolShotId, weapon_id: itemsIds.pistolWeaponId,
    name: 'Disparo', usage: null, damage_source: 'fixed', damage_modifier: 1,
    damage_dice: '2d', damage_type: 'pi', armor_penetration: 0,
    accuracy: 2, range: '150/1600', recoil: 3, shots: 7
  },
  // Arco: baseado no Rated ST (THR @ rated_st) IMP
  {
    id: itemsIds.recurveBowShotId, weapon_id: itemsIds.recurveBowWeaponId,
    name: 'Disparo', usage: null, damage_source: 'rated_st_thrust', damage_modifier: 0,
    damage_dice: null, damage_type: 'imp', armor_penetration: 0,
    accuracy: 2, range: '150/200', recoil: null, shots: 1
  },
  // Cajado: Swing SW+1 CR | Thrust THR+1 CR
  {
    id: itemsIds.wizardStaffSwingId, weapon_id: itemsIds.wizardStaffWeaponId,
    name: 'Golpe', usage: null, damage_source: 'st_swing', damage_modifier: 1,
    damage_dice: null, damage_type: 'cr', armor_penetration: 0,
    accuracy: null, range: 'C,1', recoil: null, shots: null
  },
  {
    id: itemsIds.wizardStaffThrustId, weapon_id: itemsIds.wizardStaffWeaponId,
    name: 'Estocada', usage: null, damage_source: 'st_thrust', damage_modifier: 1,
    damage_dice: null, damage_type: 'cr', armor_penetration: 0,
    accuracy: null, range: 'C', recoil: null, shots: null
  },
  // Cajado do Arcanista: Swing SW+2 CR | Thrust THR+1 CR
  {
    id: itemsIds.arcanistStaffSwingId, weapon_id: itemsIds.arcanistStaffWeaponId,
    name: 'Golpe', usage: null, damage_source: 'st_swing', damage_modifier: 2,
    damage_dice: null, damage_type: 'cr', armor_penetration: 0,
    accuracy: null, range: 'C,1', recoil: null, shots: null
  },
  {
    id: itemsIds.arcanistStaffThrustId, weapon_id: itemsIds.arcanistStaffWeaponId,
    name: 'Estocada', usage: null, damage_source: 'st_thrust', damage_modifier: 1,
    damage_dice: null, damage_type: 'cr', armor_penetration: 0,
    accuracy: null, range: 'C', recoil: null, shots: null
  },
  // Adaga Arcana: Swing SW-3 CUT | Thrust THR+1 IMP
  {
    id: itemsIds.arcaneDaggerSwingId, weapon_id: itemsIds.arcaneDaggerWeaponId,
    name: 'Golpe', usage: null, damage_source: 'st_swing', damage_modifier: -3,
    damage_dice: null, damage_type: 'cut', armor_penetration: 0,
    accuracy: null, range: 'C', recoil: null, shots: null
  },
  {
    id: itemsIds.arcaneDaggerThrustId, weapon_id: itemsIds.arcaneDaggerWeaponId,
    name: 'Estocada', usage: null, damage_source: 'st_thrust', damage_modifier: 1,
    damage_dice: null, damage_type: 'imp', armor_penetration: 0,
    accuracy: null, range: 'C', recoil: null, shots: null
  }
]

export const armors: SeedArmor[] = [
  { id: itemsIds.leatherArmorDefId, item_id: itemsIds.leatherArmorId, dr: 2, flex: 0, locations: 'torso', fit: 'normal' },
  { id: itemsIds.galhornLeatherArmorDefId, item_id: itemsIds.galhornLeatherArmorId, dr: 2, flex: 0, locations: 'torso', fit: 'tailored' },
  { id: itemsIds.leatherBracersDefId, item_id: itemsIds.leatherBracersId, dr: 2, flex: 0, locations: 'arms', fit: 'normal' },
  { id: itemsIds.leatherBootsDefId, item_id: itemsIds.leatherBootsId, dr: 2, flex: 0, locations: 'legs,feet', fit: 'normal' },
  { id: itemsIds.kaelLeatherArmorDefId, item_id: itemsIds.kaelLeatherArmorId, dr: 2, flex: 0, locations: 'torso', fit: 'tailored' },
  { id: itemsIds.robesDefId, item_id: itemsIds.robesId, dr: 0, flex: 1, locations: 'full_body', fit: 'loose' },
  { id: itemsIds.mediumShieldDefId, item_id: itemsIds.mediumShieldId, dr: 6, flex: 0, locations: 'arm', fit: 'normal' }
]
