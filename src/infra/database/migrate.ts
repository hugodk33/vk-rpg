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
CREATE TABLE IF NOT EXISTS characters (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  table_id TEXT,
  name TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (table_id) REFERENCES game_tables(id)
);

CREATE TABLE IF NOT EXISTS game_table_character_images (
  id TEXT PRIMARY KEY,
  character_id TEXT,
  url TEXT,
  FOREIGN KEY (character_id) REFERENCES characters(id)
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
  FOREIGN KEY (character_id) REFERENCES characters(id)
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
  value TEXT,
  test TEXT,
  character_id TEXT,
  FOREIGN KEY (narrations_id) REFERENCES narrations(id),
  FOREIGN KEY (character_id) REFERENCES characters(id)
);

CREATE TABLE IF NOT EXISTS narration_characters (
  id TEXT PRIMARY KEY,
  character_id TEXT,
  narrations_id TEXT,
  FOREIGN KEY (character_id) REFERENCES characters(id),
  FOREIGN KEY (narrations_id) REFERENCES narrations(id)
);

CREATE TABLE IF NOT EXISTS narration_locations (
  id TEXT PRIMARY KEY,
  location_id TEXT,
  narrations_id TEXT,
  FOREIGN KEY (location_id) REFERENCES table_locations(id),
  FOREIGN KEY (narrations_id) REFERENCES narrations(id)
);

-- =========================
-- ITEMS
-- =========================
CREATE TABLE IF NOT EXISTS game_table_items (
  id TEXT PRIMARY KEY,
  table_id TEXT ,
  name TEXT,
  type INTEGER,
  category TEXT,
  weight INTEGER,
  dimensions TEXT,
  description TEXT,
  quality TEXT,
  condition TEXT,
  holder_id TEXT,
  owner_id TEXT,
  skill_user_id TEXT,
  skill_level TEXT,
  FOREIGN KEY (table_id) REFERENCES game_tables(id),
  FOREIGN KEY (holder_id) REFERENCES users(id),
  FOREIGN KEY (owner_id) REFERENCES users(id),
  FOREIGN KEY (skill_user_id) REFERENCES users(id)
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

-- =========================
-- DAMAGES
-- =========================
CREATE TABLE IF NOT EXISTS game_table_damages (
  id TEXT PRIMARY KEY,
  table_id TEXT,
  name TEXT,
  description TEXT,
  type TEXT,
  value TEXT,
  range TEXT,
  character_id TEXT,
  item_id TEXT,
  skill_id TEXT,
  advantage_id TEXT,
  FOREIGN KEY (table_id) REFERENCES game_tables(id),
  FOREIGN KEY (character_id) REFERENCES characters(id),
  FOREIGN KEY (item_id) REFERENCES game_table_items(id),
  FOREIGN KEY (skill_id) REFERENCES game_table_skills(id),
  FOREIGN KEY (advantage_id) REFERENCES game_table_character_advantages(id)
);

-- =========================
-- NPCs
-- =========================
CREATE TABLE IF NOT EXISTS game_table_npcs (
  id TEXT PRIMARY KEY,
  character_id TEXT,
  status TEXT,
  FOREIGN KEY (character_id) REFERENCES characters(id)
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
  predefinition_type TEXT,
  predefinition_difficulty TEXT,
  description TEXT,
  FOREIGN KEY (table_id) REFERENCES game_tables(id)
);

CREATE TABLE IF NOT EXISTS game_table_skill_dependencies (
  id TEXT PRIMARY KEY,
  origin_skill_id TEXT,
  depends_on_skill_id TEXT,
  depends_on_skill_value TEXT,
  depends_on_skill_for_others_attributes TEXT,
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
  FOREIGN KEY (character_id) REFERENCES characters(id),
  FOREIGN KEY (skill_id) REFERENCES game_table_skills(id)
);

-- =========================
-- ADVANTAGES
-- =========================
CREATE TABLE IF NOT EXISTS game_table_character_advantages (
  id TEXT PRIMARY KEY,
  name TEXT,
  character_id TEXT,
  cost_points INTEGER,
  effect TEXT,
  FOREIGN KEY (character_id) REFERENCES characters(id)
);

-- =========================
-- DISADVANTAGES / PECULIARITIES
-- =========================
CREATE TABLE IF NOT EXISTS game_table_peculiarities (
  id TEXT PRIMARY KEY,
  table_id TEXT,
  name TEXT,
  cost_points INTEGER,
  effect TEXT,
  description TEXT,
  FOREIGN KEY (table_id) REFERENCES game_tables(id)
);

CREATE TABLE IF NOT EXISTS game_table_advantages (
  id TEXT PRIMARY KEY,
  table_id TEXT,
  name TEXT,
  cost_points INTEGER,
  effect TEXT,
  description TEXT,
  FOREIGN KEY (table_id) REFERENCES game_tables(id)
);

-- =========================
-- MODIFIERS
-- =========================
CREATE TABLE IF NOT EXISTS game_table_modifiers (
  id TEXT PRIMARY KEY,
  table_id TEXT,
  name TEXT,
  duration TEXT,
  FOREIGN KEY (table_id) REFERENCES game_tables(id)
);

-- RELAÇÕES (arrays)
CREATE TABLE IF NOT EXISTS game_table_modifier_scenes (
  id TEXT PRIMARY KEY,
  modifier_id TEXT,
  scene_id TEXT,
  FOREIGN KEY (modifier_id) REFERENCES game_table_modifiers(id),
  FOREIGN KEY (scene_id) REFERENCES scenes(id)
);

CREATE TABLE IF NOT EXISTS game_table_modifier_attributes (
  id TEXT PRIMARY KEY,
  modifier_id TEXT,
  attribute TEXT,
  FOREIGN KEY (modifier_id) REFERENCES game_table_modifiers(id)
);

CREATE TABLE IF NOT EXISTS game_table_modifier_skills (
  id TEXT PRIMARY KEY,
  modifier_id TEXT,
  skill_id TEXT,
  FOREIGN KEY (modifier_id) REFERENCES game_table_modifiers(id),
  FOREIGN KEY (skill_id) REFERENCES game_table_skills(id)
);

CREATE TABLE IF NOT EXISTS game_table_modifier_advantages (
  id TEXT PRIMARY KEY,
  modifier_id TEXT,
  advantage_id TEXT,
  FOREIGN KEY (modifier_id) REFERENCES game_table_modifiers(id),
  FOREIGN KEY (advantage_id) REFERENCES game_table_character_advantages(id)
);

CREATE TABLE IF NOT EXISTS game_table_modifier_items (
  id TEXT PRIMARY KEY,
  modifier_id TEXT,
  item_id TEXT,
  FOREIGN KEY (item_id) REFERENCES game_table_items(id),
  FOREIGN KEY (modifier_id) REFERENCES game_table_modifiers(id)
);

CREATE TABLE IF NOT EXISTS log (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  action TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

`)

console.log('✅ Full database migrated!')

// npx ts-node src/infra/database/migrate.ts
// npx ts-node src/infra/database/seed.ts