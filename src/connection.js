import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const database = process.env.DB_NAME;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const port = process.env.DB_PORT;
const host = process.env.DB_HOST;

const pool = new Pool({
  user: user,
  password: password,
  host: host,
  database: database,
  port: port,
});

const connectToDb = async () => {
  try {
    await pool.connect();
    console.log('Connected to the database.');
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1);
  }
};

export { pool, connectToDb };
