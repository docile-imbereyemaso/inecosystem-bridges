/**
 * This file handles the database connection using PostgreSQL.
 * It sets up a connection pool and logs the connection status.
 *
 * Ensure your database credentials are set in the .env file.
 */

import pkg from "pg";
import dotenv from "dotenv";
import { logger } from "../utils/index.js";
import { v4 as uuidv4 } from 'uuid';

const newId = uuidv4();
const { Pool } = pkg;
dotenv.config();

// Create pool with SSL
const pool = new Pool({
  user: String(process.env.DB_USER),
  host: String(process.env.DB_HOST),
  database: String(process.env.DB_NAME),
  password: String(process.env.DB_PASSWORD),  // ✅ force string
  port: Number(process.env.DB_PORT),
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
});

pool.connect()
  .then(() => console.log("INFO:: Connected to PostgreSQL Database"))
  .catch(err => console.error("ERROR:: Database setup error:", err));


// Setup database and create table if it doesn't exist for companies
(async function () {
  const client = await pool.connect();
  try {
    logger.info("Connected to PostgreSQL Database");

    await client.query(`
      CREATE TABLE IF NOT EXISTS companies (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        name text NOT NULL,
        description text,
        locations jsonb,
        contacts jsonb,
        offerings jsonb,
        created_at timestamp with time zone DEFAULT now()
      );


    


    `);

    // INTERNSHIPS TABLE

    await client.query(
      `CREATE TABLE IF NOT EXISTS internships (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('Summer', 'Winter', 'Part-time', 'Full-time')),
  level text NOT NULL CHECK (level IN ('High School', 'Undergraduate', 'Graduate', 'PhD')),
  sponsorship boolean NOT NULL DEFAULT false,
  sector text NOT NULL CHECK (sector IN ('Technology', 'Finance', 'Healthcare', 'Marketing', 'Engineering', 'Design', 'Research')),
  period text NOT NULL,
  application_open boolean NOT NULL DEFAULT true,
  deadline timestamp with time zone NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);`
    );
   
    // JOBS TABLE

    await client.query(`CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('Full-time', 'Part-time', 'Contract', 'Freelance')),
  skills_required jsonb NOT NULL DEFAULT '[]',
  qualifications jsonb NOT NULL DEFAULT '[]',
  level text NOT NULL CHECK (level IN ('Entry', 'Mid', 'Senior', 'Lead')),
  link text NOT NULL,
  period text NOT NULL,
  positions integer NOT NULL CHECK (positions >= 1),
  created_at timestamp with time zone DEFAULT now()
);`);

// CONTRIBUTION TABLE

await client.query(`CREATE TABLE IF NOT EXISTS contributions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  type text NOT NULL CHECK (type IN ('Research Report', 'Industry Analysis', 'Skills Assessment', 'Market Study', 'Other')),
  description text,
  author text NOT NULL,
  date_created timestamp with time zone NOT NULL,
  status text NOT NULL CHECK (status IN ('Draft', 'Under Review', 'Published', 'Archived')),
  tags jsonb NOT NULL DEFAULT '[]',
  file_url text,
  created_at timestamp with time zone DEFAULT now()
);`);

// -------------

    await client.query(`INSERT INTO companies (name, description, locations, contacts, offerings)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        name,
        description,
        JSON.stringify(locations),
        JSON.stringify(contacts),
        JSON.stringify(offerings)
      ]
    );
    logger.info("Database setup complete");
  } catch (err) {
    logger.error(`Database setup error: ${err.message}`);
  } finally {
    client.release();
  }
})();

export default pool;


console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_USER:", process.env.DB_NAME);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);