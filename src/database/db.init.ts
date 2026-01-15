//It bootstrap the database. It must be execute only once with node db.init.ts or with a script
import db from './db'

db.prepare(`
    CREATE TABLE IF NOT EXISTS tickets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fullname TEXT NOT NULL,
        telephone TEXT NOT NULL UNIQUE,
        brand  TEXT NOT NULL,
        status TEXT NOT NULL,
        comment TEXT NOT NULL
    )
`).run();

console.log('✅ Database initialized')