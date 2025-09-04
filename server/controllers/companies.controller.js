/**
 * This file contains the controller functions related to student operations.
 * Currently, it includes a function to retrieve all students from the database.
 *
 * Add more functions here to handle other student-related operations (e.g., create, update, delete).
 */
import pool from "../config/db.js";
import { logger } from "../utils/index.js";



const createCompany = async (req, res) => {
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
export default createCompany;
