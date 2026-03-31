import { db } from './database'

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  type INTEGER,
  username TEXT,
  password TEXT,
  phone TEXT,
  email TEXT
);
`)

console.log('Database migrated!')