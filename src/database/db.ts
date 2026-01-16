import sqlite3 from 'better-sqlite3';
import path from 'path';

// Get the absolute path to the database file in the project root
const dbPath = path.join(process.cwd(), 'tickets.db');
const db = sqlite3(dbPath);

// Enable WAL mode for better concurrency (optional but recommended)
db.pragma('journal_mode = WAL');

export default db;