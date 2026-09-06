// src/infra/database/migrate.ts
import { db } from './database'

db.exec(`

PRAGMA foreign_keys = ON;

-- =========================
-- USERS
-- =========================
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  type INTEGER,
  username TEXT,
  password TEXT,
  phone TEXT,
  email TEXT
);

-- =========================
-- NARRATORS
-- =========================
CREATE TABLE IF NOT EXISTS narrators (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  name TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS narrator_images (
  id TEXT PRIMARY KEY,
  narrator_id TEXT,
  url TEXT,
  FOREIGN KEY (narrator_id) REFERENCES narrators(id)
);

-- =========================
-- GAME TABLES
-- =========================
CREATE TABLE IF NOT EXISTS game_tables (
  id TEXT PRIMARY KEY,
  narrator_id TEXT,
  title TEXT,
  system TEXT,
  intro TEXT,
  FOREIGN KEY (narrator_id) REFERENCES narrators(id)
);

CREATE TABLE IF NOT EXISTS game_table_players (
  id TEXT PRIMARY KEY,
  table_id TEXT,
  user_id TEXT,
  FOREIGN KEY (table_id) REFERENCES game_tables(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- =========================
-- CHARACTERS
-- =========================
CREATE TABLE IF NOT EXISTS game_table_characters (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  table_id TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (table_id) REFERENCES game_tables(id)
);

CREATE TABLE IF NOT EXISTS game_table_character_images (
  id TEXT PRIMARY KEY,
  character_id TEXT,
  url TEXT,
  FOREIGN KEY (character_id) REFERENCES game_table_characters(id)
);

-- =========================
-- CHARACTER SHEET (GURPS)
-- =========================
CREATE TABLE IF NOT EXISTS game_table_character_sheets (
  id TEXT PRIMARY KEY,
  character_id TEXT,
  name TEXT,
  bio TEXT,
  backstory TEXT,
  points INTEGER,
  hp INTEGER,
  st INTEGER,
  dx INTEGER,
  iq INTEGER,
  ht INTEGER,
  fatigue INTEGER,
  encumbrance TEXT,
  FOREIGN KEY (character_id) REFERENCES game_table_characters(id)
);

-- =========================
-- SCENES
-- =========================
CREATE TABLE IF NOT EXISTS scenes (
  id TEXT PRIMARY KEY,
  table_id TEXT,
  title TEXT,
  chapter INTEGER,
  moment INTEGER,
  FOREIGN KEY (table_id) REFERENCES game_tables(id)
);

-- =========================
-- NARRATIONS
-- =========================
CREATE TABLE IF NOT EXISTS narrations (
  id TEXT PRIMARY KEY,
  table_id TEXT,
  scene_id TEXT,
  title TEXT,
  narration TEXT,
  moment INTEGER,
  FOREIGN KEY (table_id) REFERENCES game_tables(id),
  FOREIGN KEY (scene_id) REFERENCES scenes(id)
);

-- =========================
-- LOCATIONS
-- =========================
CREATE TABLE IF NOT EXISTS table_locations (
  id TEXT PRIMARY KEY,
  table_id TEXT,
  name TEXT,
  region TEXT,
  address TEXT,
  sub_region TEXT,
  is_indoor INTEGER,
  other TEXT,
  country TEXT,
  area TEXT,
  dimensions TEXT,
  description TEXT,
  FOREIGN KEY (table_id) REFERENCES game_tables(id)
);

CREATE TABLE IF NOT EXISTS narration_actions (
  id TEXT PRIMARY KEY,
  narrations_id TEXT,
  queue NUMERIC,
  result TEXT,
  dice_roll TEXT,
  modificator TEXT,
  target TEXT,
  multitarget BOOLEAN,
  description TEXT,
  character_id TEXT,
  datetime DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (narrations_id) REFERENCES narrations(id),
  FOREIGN KEY (character_id) REFERENCES game_table_characters(id)
  FOREIGN KEY (target) REFERENCES game_table_characters(id)
);

CREATE TABLE IF NOT EXISTS narration_characters (
  id TEXT PRIMARY KEY,
  character_id TEXT,
  narrations_id TEXT,
  FOREIGN KEY (character_id) REFERENCES game_table_characters(id),
  FOREIGN KEY (narrations_id) REFERENCES narrations(id)
);

CREATE TABLE IF NOT EXISTS narration_locations (
  id TEXT PRIMARY KEY,
  location_id TEXT,
  narrations_id TEXT,
  FOREIGN KEY (location_id) REFERENCES table_locations(id),
  FOREIGN KEY (narrations_id) REFERENCES narrations(id)
);

-- =====================================================================
-- ITEMS (GURPS)
-- ---------------------------------------------------------------------
-- Separação conceitual (REGRA GERAL):
--   DATABASE  = dados e parâmetros das regras
--   ENGINE    = cálculos (dano final, skill, vantagens, combate)
-- Não armazenamos o DANO FINAL de uma arma. A arma guarda parâmetros e
-- a engine combina com ST/THR/SW do personagem para calcular o resultado.
-- =====================================================================

-- ---------------------------------------------------------------
-- game_table_items  : dados GENÉRICOS do objeto
-- 'kind' discrimina a especialização (weapon/armor/shield/equipment)
-- 'holder_id'/'owner_id' NÃO ficam aqui: estado do personagem vive em
-- character_equipment.
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS game_table_items (
  id TEXT PRIMARY KEY,
  table_id TEXT,
  name TEXT,
  kind TEXT,            -- 'weapon' | 'armor' | 'shield' | 'equipment'
  category TEXT,        -- domínio: melee | ranged | clothing | ...
  weight_lb REAL,       -- peso em libras (GURPS)
  cost INTEGER,         -- custo em $ (GURPS)
  dimensions TEXT,
  description TEXT,
  quality TEXT,         -- domínio: cheap | standard | fine | very_fine
  condition TEXT,       -- domínio: new | worn | damaged | broken
  FOREIGN KEY (table_id) REFERENCES game_tables(id)
);

CREATE TABLE IF NOT EXISTS item_images (
  id TEXT PRIMARY KEY,
  item_id TEXT,
  url TEXT,
  FOREIGN KEY (item_id) REFERENCES game_table_items(id)
);

CREATE TABLE IF NOT EXISTS table_images (
  id TEXT PRIMARY KEY,
  table_id TEXT,
  url TEXT,
  FOREIGN KEY (table_id) REFERENCES game_tables(id)
);

-- ---------------------------------------------------------------
-- game_table_weapons : características específicas da ARMA
-- 1 item -> 1 weapon (opcional; só quando kind='weapon' ou 'shield')
-- min_st / rated_st / reach / parry / block  são parâmetros lidos
-- pela engine. reach é textual pois pode haver múltiplos (ex: 'C,1').
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS game_table_weapons (
  id TEXT PRIMARY KEY,
  item_id TEXT,
  skill TEXT,           -- skill recomendada (ex: 'Shortsword') - domínio/texto
  min_st INTEGER,       -- requisito mínimo de ST do personagem
  rated_st INTEGER,     -- Rated ST (essencial para arcos)
  handedness INTEGER,   -- 1 ou 2 (mãos padrão)
  reach TEXT,           -- ex: 'C', '1', 'C,1'
  parry TEXT,           -- ex: '0', '0U', 'No'
  block TEXT,           -- para escudos: DB genérico textual (ex: '3')
  fit TEXT DEFAULT 'normal', -- domínio: cheap | normal | tailored | loose
  FOREIGN KEY (item_id) REFERENCES game_table_items(id)
);

-- ---------------------------------------------------------------
-- weapon_attacks : formas de ataque de UMA arma (1 arma -> N ataques)
-- NÃO guarda dano final. Guarda a FONTE de dano + modificador + tipo.
--   damage_source: 'st_swing' | 'st_thrust' | 'rated_st_swing' |
--                  'rated_st_thrust' | 'fixed'
--   - fontes baseadas em ST são resolvidas pela engine usando a
--     tabela gurps_damage_table (ST -> THR/SW).
--   - 'fixed' guarda o dano em dados (ex: pistola '2d+1').
--   damage_modifier: inteiro aplicado sobre a base (ex: SW+1 -> 1).
--   damage_dice    : usado só quando source='fixed' (ex: '2d').
--   damage_type    : tipo de dano GURPS (cut/imp/cr/pi/pi-/pi+/burn/tox...)
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS weapon_attacks (
  id TEXT PRIMARY KEY,
  weapon_id TEXT,
  name TEXT,                -- ex: 'Swing', 'Thrust', 'Shot'
  usage TEXT,               -- ex: 'one-hand' | 'two-hand' | null
  damage_source TEXT,       -- ver enum acima
  damage_modifier INTEGER,  -- ex: SW+1 -> +1
  damage_dice TEXT,         -- ex: '2d' (só p/ source='fixed')
  damage_type TEXT,         -- ex: 'cut', 'imp', 'cr', 'pi', 'pi-', 'pi+'
  armor_penetration INTEGER,-- ex: 0 (para piercing avançado), reservado
  accuracy INTEGER,         -- acurácia (armas de projétil)
  range TEXT,               -- ex: '1', '150/1600', 'Melee'
  recoil INTEGER,           -- recuo (armas de fogo)
  shots INTEGER,            -- capacidade / calibre específico p/ futura munição
  FOREIGN KEY (weapon_id) REFERENCES game_table_weapons(id)
);

-- ---------------------------------------------------------------
-- game_table_armors : características específicas da ARMADURA / escudo
-- 1 item -> 1 armor (opcional; quando kind='armor' ou 'shield')
-- dr/flex/locations/fit são lidos pela engine de combate (não há
-- regra de dano final aqui). locations textual p/ liberdade de domínio.
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS game_table_armors (
  id TEXT PRIMARY KEY,
  item_id TEXT,
  dr INTEGER,           -- Damage Resistance
  flex INTEGER,         -- 1 = flexível (permite camadas)
  locations TEXT,       -- ex: 'torso', 'arms,legs', 'full_body'
  fit TEXT,             -- domínio: cheap | normal | tailored | loose
  FOREIGN KEY (item_id) REFERENCES game_table_items(id)
);

-- ---------------------------------------------------------------
-- gurps_damage_table : relação ST -> THR/SW (tabela de regras do GURPS)
-- Dados de referência usados pela engine para derivar dano básico.
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS gurps_damage_table (
  id TEXT PRIMARY KEY,
  st INTEGER,
  thrust TEXT,
  swing TEXT
);

-- ---------------------------------------------------------------
-- character_equipment : ESTADO / EQUIPAMENTO do personagem
-- Separa o que "existe no mundo" (game_table_items) de quem possui e
-- como está equipado. 'status' = inventário | equipado | empunhado.
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS character_equipment (
  id TEXT PRIMARY KEY,
  character_id TEXT,
  item_id TEXT,
  quantity INTEGER DEFAULT 1,
  status TEXT,          -- domínio: in_inventory | equipped | wielded
  location TEXT,        -- ex: 'right_hand', 'torso', 'back', 'none'
  rendered_st INTEGER,  -- ST efetivo (buff/condição), reservado p/ engine
  FOREIGN KEY (character_id) REFERENCES game_table_characters(id),
  FOREIGN KEY (item_id) REFERENCES game_table_items(id)
);

-- =========================
-- NPCs
-- =========================
CREATE TABLE IF NOT EXISTS game_table_npcs (
  id TEXT PRIMARY KEY,
  character_id TEXT,
  status TEXT,
  FOREIGN KEY (character_id) REFERENCES game_table_characters(id)
);

CREATE TABLE IF NOT EXISTS narration_npcs (
  id TEXT PRIMARY KEY,
  narration_id TEXT NOT NULL,
  npc_id TEXT NOT NULL,
  FOREIGN KEY (narration_id) REFERENCES narrations(id),
  FOREIGN KEY (npc_id) REFERENCES game_table_npcs(id)
);

-- =========================
-- SKILLS
-- =========================
CREATE TABLE IF NOT EXISTS game_table_skills (
  id TEXT PRIMARY KEY,
  table_id TEXT,
  name TEXT,
  category TEXT,
  subcategory TEXT,
  type TEXT,
  predefinition_type TEXT,
  predefinition_difficulty TEXT,
  description TEXT,
  FOREIGN KEY (table_id) REFERENCES game_tables(id)
);

CREATE TABLE IF NOT EXISTS game_table_skill_predefinede (
  id TEXT PRIMARY KEY,
  origin_skill_id TEXT,
  depends_on_skill_id TEXT,
  depends_on_skill_value TEXT,
  depends_on_skill_for_others_attributes TEXT,
  FOREIGN KEY (origin_skill_id) REFERENCES game_table_skills(id)
  FOREIGN KEY (depends_on_skill_id) REFERENCES game_table_skills(id)
);

CREATE TABLE IF NOT EXISTS game_table_skill_dependencies (
  id TEXT PRIMARY KEY,
  origin_skill_id TEXT,
  depends_on_skill_id TEXT,
  depends_on_skill_value TEXT,
  depends_type TEXT,
  FOREIGN KEY (origin_skill_id) REFERENCES game_table_skills(id)
  FOREIGN KEY (depends_on_skill_id) REFERENCES game_table_skills(id)
);

-- =========================
-- CHARACTER SKILLS
-- =========================
CREATE TABLE IF NOT EXISTS game_table_character_skills (
  id TEXT PRIMARY KEY,
  character_id TEXT,
  skill_id TEXT,
  cost_points INTEGER,
  effect TEXT,
  FOREIGN KEY (character_id) REFERENCES game_table_characters(id),
  FOREIGN KEY (skill_id) REFERENCES game_table_skills(id)
);

-- =========================
-- ADVANTAGES
-- =========================
CREATE TABLE IF NOT EXISTS game_table_character_advantages (
  id TEXT PRIMARY KEY,
  advantage_id TEXT,
  name TEXT,
  character_id TEXT,
  cost_points INTEGER,
  effect TEXT,
  FOREIGN KEY (character_id) REFERENCES game_table_characters(id)
  FOREIGN KEY (advantage_id) REFERENCES game_table_advantages(id)
);

CREATE TABLE IF NOT EXISTS game_table_character_disadvantages (
  id TEXT PRIMARY KEY,
  disadvantage_id TEXT,
  name TEXT,
  character_id TEXT,
  cost_points INTEGER,
  effect TEXT,
  FOREIGN KEY (character_id) REFERENCES game_table_characters(id)
  FOREIGN KEY (disadvantage_id) REFERENCES game_table_disadvantages(id)
);

-- =========================
-- DISADVANTAGES / PECULIARITIES
-- =========================
CREATE TABLE IF NOT EXISTS game_table_characters_quirks (
  id TEXT PRIMARY KEY,
  character_id TEXT,
  name TEXT,
  cost_points INTEGER,
  effect TEXT,
  description TEXT,
  FOREIGN KEY (character_id) REFERENCES game_table_characters(id)
);

CREATE TABLE IF NOT EXISTS game_table_advantages (
  id TEXT PRIMARY KEY,
  table_id TEXT,
  name TEXT,
  category TEXT,
  subcategory TEXT,
  cost_points INTEGER,
  description TEXT,
  FOREIGN KEY (table_id) REFERENCES game_tables(id)
);

CREATE TABLE IF NOT EXISTS game_table_disadvantages (
  id TEXT PRIMARY KEY,
  table_id TEXT,
  name TEXT,
  category TEXT,
  subcategory TEXT,
  cost_points INTEGER,
  effect TEXT,
  description TEXT,
  FOREIGN KEY (table_id) REFERENCES game_tables(id)
);

CREATE TABLE IF NOT EXISTS modifiers (
  id TEXT PRIMARY KEY,
  character_id TEXT,
  item_id TEXT,
  skill_id TEXT,
  advantage_id TEXT,
  disadvantage_id TEXT,
  action_id TEXT,
  narration_id TEXT,
  scene_id TEXT,
  name TEXT,
  cost_points INTEGER,
  effect TEXT,
  description TEXT,
  hp INTEGER,
  st INTEGER,
  dx INTEGER,
  iq INTEGER,
  ht INTEGER,
  fatigue INTEGER,
  encumbrance TEXT,
  mod_hp INTEGER,
  mod_st INTEGER,
  mod_dx INTEGER,
  mod_iq INTEGER,
  mod_ht INTEGER,
  mod_fatigue INTEGER,
  mod_encumbrance TEXT,
  skill_value TEXT,
  advantage_value TEXT,
  disadvantage_value TEXT,
  armor_value TEXT,
  damage_value TEXT,
  item_quantity INTEGER,
  item_dimension TEXT,
  item_weight INTEGER,
  item_range TEXT,
  item_status TEXT,
  FOREIGN KEY (character_id) REFERENCES game_table_characters(id),
  FOREIGN KEY (item_id) REFERENCES game_table_items(id),
  FOREIGN KEY (skill_id) REFERENCES game_table_skills(id),
  FOREIGN KEY (advantage_id) REFERENCES game_table_advantages(id),
  FOREIGN KEY (disadvantage_id) REFERENCES game_table_disadvantages(id),
  FOREIGN KEY (action_id) REFERENCES narration_actions(id),
  FOREIGN KEY (narration_id) REFERENCES narrations(id),
  FOREIGN KEY (scene_id) REFERENCES scenes(id)
);

CREATE TABLE IF NOT EXISTS visibility (
  id TEXT PRIMARY KEY,
  character_id TEXT,
  other_character_id TEXT,
  skill_id TEXT,
  advantage_id TEXT,
  disadvantage_id TEXT,
  attribute TEXT,
  additionals_attributes TEXT,
  item_id TEXT,
  value TEXT,
  status TEXT,
  FOREIGN KEY (character_id) REFERENCES game_table_characters(id),
  FOREIGN KEY (other_character_id) REFERENCES game_table_characters(id),
  FOREIGN KEY (skill_id) REFERENCES game_table_skills(id)
);

CREATE TABLE IF NOT EXISTS queue (
  id TEXT PRIMARY KEY,
  character_id TEXT,
  action_id TEXT,
  queue TEXT,
  status TEXT,
  test_dice TEXT DEFAULT '6',
  test_count INTEGER DEFAULT 3,
  test_mod INTEGER DEFAULT 0,
  test_attr TEXT DEFAULT 'dx'
);

CREATE TABLE IF NOT EXISTS log (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  action TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

`)

// Backfills para bases já existentes (CREATE TABLE IF NOT EXISTS não altera esquema)
const weaponCols = (db.prepare("PRAGMA table_info(game_table_weapons)").all() as any[]).map((c) => c.name)
if (!weaponCols.includes('fit')) {
  db.exec("ALTER TABLE game_table_weapons ADD COLUMN fit TEXT DEFAULT 'normal'")
}

// visibility.other_character_id para bases criadas antes da coluna
const visibilityCols = (db.prepare("PRAGMA table_info(visibility)").all() as any[]).map((c) => c.name)
if (visibilityCols.length && !visibilityCols.includes('other_character_id')) {
  db.exec("ALTER TABLE visibility ADD COLUMN other_character_id TEXT")
}

// queue.test_* para o teste controlado pelo narrador (bases criadas antes das colunas)
const queueCols = (db.prepare("PRAGMA table_info(queue)").all() as any[]).map((c) => c.name)
if (queueCols.length && !queueCols.includes('test_dice')) {
  db.exec("ALTER TABLE queue ADD COLUMN test_dice TEXT DEFAULT '6'")
  db.exec("ALTER TABLE queue ADD COLUMN test_count INTEGER DEFAULT 3")
  db.exec("ALTER TABLE queue ADD COLUMN test_mod INTEGER DEFAULT 0")
  db.exec("ALTER TABLE queue ADD COLUMN test_attr TEXT DEFAULT 'dx'")
}

console.log('✅ Full database migrated!')

// npx ts-node src/infra/database/migrate.ts
// npx ts-node src/infra/database/seed.ts