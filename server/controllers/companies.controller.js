/**
 * This file contains the controller functions related to student operations.
 * Currently, it includes a function to retrieve all students from the database.
 *
 * Add more functions here to handle other student-related operations (e.g., create, update, delete).
 */
import pool from "../config/db.js";
import { logger } from "../utils/index.js";


// FOR COMPANY INSERTION TABLE
export default async function createCompany(req, res){
  const { name, description, locations, contacts, offerings } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO companies (name, description, locations, contacts, offerings)
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

    res.status(201).json({ success: true, company: result.rows[0] });
  } catch (error) {
    console.error("Database insert error:", error);
    res.status(500).json({ success: false, message: "Database error", error: error.message });
  }
};

// CONTRIBUTION INSERT
export async function insertContribution(req, res) {
  const { title, type, description, author, dateCreated, status, tags, fileUrl } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO contributions 
        (title, type, description, author, date_created, status, tags, file_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, $8)
       RETURNING *`,
      [
        title,
        type,
        description || null,
        author,
        dateCreated || new Date().toISOString(),
        status,
        JSON.stringify(tags || []),
        fileUrl || null
      ]
    );

    res.status(201).json({ success: true, contribution: result.rows[0] });
  } catch (error) {
    console.error("Database insert error:", error); // ✅ this logs the real issue
    res.status(500).json({ success: false, message: "Database error", error: error.message });
  }
}
// INSERTING THE INTERNSHIP TABLE



export async function insertInternship(req, res){
  try {
    const {
      name, type, level, sponsorship,
      sector, period, applicationOpen, deadline
    } = req.body;

    const result = await pool.query(
      `INSERT INTO internships (name, type, level, sponsorship, sector, period, application_open, deadline)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
  [
    name,
    type,
    level,
    sponsorship,
    sector,
    period,
    applicationOpen,
    deadline,
  ]

    );

    res.status(201).json({ success: true, company: result.rows[0] });
  } catch (error) {
    console.error("Database insert error:", error);
    res.status(500).json({ success: false, message: "Database error", error: error.message });
  }
};

// INSERT INTO JOBS



export const insertJob = async (req, res) => {
  try {
    const {
      name,
      type,
      skillsRequired,
      qualifications,
      level,
      link,
      period,
      positions,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO jobs (name, type, skillsRequired, qualifications, level, link, period, positions)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [name, type, JSON.stringify(skillsRequired),JSON.stringify(qualifications),  level, link, period, positions]
    );

    res.json({ success: true, job: result.rows[0] });
  } catch (err) {
    console.error("Insert job error:", err);
    res.status(500).json({ success: false, message: "Database error" });
  }
};



// GETTING DATAS FROM THE DATABASE

// COMPANY GETTING
export async function getCompanies(req, res) {
  try {
    const result = await pool.query("SELECT * FROM companies ORDER BY created_at DESC");
    res.json(result.rows); // send back all companies
  } catch (err) {
    console.error("Error fetching companies:", err);
    res.status(500).json({ message: "Error fetching companies" });
  }
}

// GETTING FROM JOBS TABLE
export async function getJobs(req, res) {
  try {
    const result = await pool.query("SELECT * FROM jobs ORDER BY created_at DESC");
    res.json(result.rows); // send back all companies
  } catch (err) {
    console.error("Error fetching companies:", err);
    res.status(500).json({ message: "Error fetching Jobs table" });
  }
}