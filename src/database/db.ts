import sqlite3 from 'better-sqlite3';

// Creates a new database if not exists
const db = sqlite3('tickets.db');

export default db;