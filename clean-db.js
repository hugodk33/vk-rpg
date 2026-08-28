const Database = require('better-sqlite3');
const db = new Database('database.sqlite');
db.pragma('foreign_keys = OFF');
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'").all().map(r => r.name);
for (const t of tables) { db.prepare(`DELETE FROM "${t}"`).run(); }
db.pragma('foreign_keys = ON');
const count = db.prepare('SELECT COUNT(*) as c FROM game_table_damages').get().c;
console.log('Damages after cleanup:', count);
db.close();
