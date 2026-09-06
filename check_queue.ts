import Database from 'better-sqlite3'
const db = new Database('database.sqlite')
console.log(db.prepare('PRAGMA table_info(queue)').all().map((c: any) => c.name).join(','))
console.log(JSON.stringify(db.prepare('SELECT id, character_id, queue, status, test_dice, test_count, test_mod, test_attr FROM queue').all(), null, 2))