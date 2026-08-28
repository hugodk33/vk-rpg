const db = require("better-sqlite3")("database.sqlite");
const q = (sql, ...p) => db.prepare(sql).all(...p);
console.log("=== modifiers table ===");
console.log(JSON.stringify(q("PRAGMA table_info(modifiers)"), null, 1));
console.log("\n=== modifiers rows ===");
console.log(JSON.stringify(q("SELECT * FROM modifiers LIMIT 20"), null, 1));
console.log("\n=== game_table_character_sheets columns ===");
console.log(JSON.stringify(q("PRAGMA table_info(game_table_character_sheets)"), null, 1));
