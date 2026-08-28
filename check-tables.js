const Database = require('better-sqlite3');
const db = new Database('database.sqlite');
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'").all();
tables.forEach(t => console.log(t.name));
db.close();
