import pool from "../config/db.js";
import { logger } from "../utils/index.js";

// ==================== INSERT FUNCTIONS ====================

// INSERT APPLICATION
export const insertApplication = async (req, res) => {
  const { user_id, program_id, name, company, applied_date, status, next_step } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO applications (user_id, program_id, name, company, applied_date, status, next_step)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        user_id,
        program_id || null,
        name,
        company,
        applied_date || new Date().toISOString().split('T')[0], // Default to today's date
        status,
        next_step || null
      ]
    );

    res.status(201).json({ success: true, application: result.rows[0] });
  } catch (error) {
    console.error("Database insert error:", error);
    res.status(500).json({ success: false, message: "Database error", error: error.message });
  }
};

// INSERT COMPLETED PROGRAM
export const insertCompletedProgram = async (req, res) => {
  const { user_id, name, company, type, duration, completed_date, grade, certificate } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO completed_programs (user_id, name, company, type, duration, completed_date, grade, certificate)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        user_id,
        name,
        company,
        type,
        duration,
        completed_date,
        grade || null,
        certificate || null
      ]
    );

    res.status(201).json({ success: true, completed_program: result.rows[0] });
  } catch (error) {
    console.error("Database insert error:", error);
    res.status(500).json({ success: false, message: "Database error", error: error.message });
  }
};

// INSERT USER PROFILE
export const insertUserProfile = async (req, res) => {
  const { first_name, last_name, email, phone, bio, skills, sectors } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO user_profiles (first_name, last_name, email, phone, bio, skills, sectors)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        first_name,
        last_name,
        email,
        phone || null,
        bio || null,
        skills || [],
        sectors || []
      ]
    );

    res.status(201).json({ success: true, user_profile: result.rows[0] });
  } catch (error) {
    console.error("Database insert error:", error);
    res.status(500).json({ success: false, message: "Database error", error: error.message });
  }
};

// ==================== RETRIEVE FUNCTIONS ====================

// GET ALL APPLICATIONS
export const getApplications = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM applications ORDER BY applied_date DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ message: "Error fetching applications" });
  }
};

// GET ALL COMPLETED PROGRAMS
export const getCompletedPrograms = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM completed_programs ORDER BY completed_date DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching completed programs:", err);
    res.status(500).json({ message: "Error fetching completed programs" });
  }
};


// GET ALL USER PROFILES
export const getUserProfiles = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM user_profiles ORDER BY user_id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching user profiles:", err);
    res.status(500).json({ message: "Error fetching user profiles" });
  }
};



// INSERT REWARD
export const insertReward = async (req, res) => {
  const { user_id, name, type, awarded_by, date, description, icon, category } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO rewards (user_id, name, type, awarded_by, date, description, icon, category)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        user_id,
        name,
        type,
        awarded_by,
        date || new Date().toISOString().split('T')[0],
        description || null,
        icon || null,
        category || null
      ]
    );

    res.status(201).json({ success: true, reward: result.rows[0] });
  } catch (error) {
    console.error("Database insert error:", error);
    res.status(500).json({ success: false, message: "Database error", error: error.message });
  }
};



// GET ALL REWARDS
export const getRewards = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM rewards ORDER BY date DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching rewards:", err);
    res.status(500).json({ message: "Error fetching rewards" });
  }
};

