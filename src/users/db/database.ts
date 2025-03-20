import Database, { Database as DatabaseType } from 'better-sqlite3';
import path from 'node:path';
import { config } from 'dotenv';

config();

if (!process.env.DB_PATH) {
  throw new Error('DB_PATH is required in the environment variables');
}

const dbPath = path.resolve(process.env.DB_PATH);

const db: DatabaseType = new Database(dbPath, { verbose: console.log });

db.prepare(
  `CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    age INTEGER NOT NULL
  )`,
).run();

export default db;
