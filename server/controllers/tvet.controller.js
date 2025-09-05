// tvet.controller.js
import pool from "../config/db.js";
import bcrypt from "bcrypt";

// ================================
// TVET PROFILES

// Admin resets a user's password
export async function adminResetPassword(req, res) {
  const { userId, newPassword } = req.body;

  if (!userId || !newPassword) {
    return res.status(400).json({ success: false, message: "userId and newPassword are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await pool.query(
      "UPDATE tvet_profiles SET password_hash = $1, updated_at = now() WHERE id = $2",
      [hashedPassword, userId]
    );

    res.json({ success: true, message: "Password reset successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Database error" });
  }
}
// ================================
// GET ONE TVET PROFILE
export async function getTvetProfile(req, res) {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT id, username, email, phone, created_at, updated_at FROM tvet_profiles WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    res.json({ success: true, profile: result.rows[0] });
  } catch (error) {
    console.error("Error fetching TVET profile:", error);
    res.status(500).json({ success: false, message: "Database error", error: error.message });
  }
}
//

export async function insertTvetProfile(req, res) {
  const { username, email, phone, passwordHash } = req.body;

  try {
    // Hash password before storing
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(passwordHash, saltRounds);

    const result = await pool.query(
      `INSERT INTO tvet_profiles (username, email, phone, password_hash)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [username, email, phone || null, hashedPassword] // use hashed password
    );

    // ⚠️ Don’t send hashed password back to client
    const { password_hash, ...profileWithoutPassword } = result.rows[0];

    res.status(201).json({ success: true, profile: profileWithoutPassword });
  } catch (error) {
    console.error("Error inserting TVET profile:", error);
    res.status(500).json({ success: false, message: "Database error", error: error.message });
  }
}

// update tvet profile

export async function updateTvetProfile(req, res) {
  const { id } = req.params;
  const { username, email, phone, currentPassword, newPassword } = req.body;

  try {
    // Fetch existing user
    const { rows } = await pool.query(
      "SELECT password_hash FROM tvet_profiles WHERE id = $1",
      [id]
    );

    if (!rows.length) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    let passwordHash = rows[0].password_hash;

    // If changing password, verify current password
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ success: false, message: "Current password is required" });
      }

      const match = await bcrypt.compare(currentPassword, passwordHash);
      if (!match) {
        return res.status(401).json({ success: false, message: "Current password is incorrect" });
      }

      // Hash new password
      passwordHash = await bcrypt.hash(newPassword, 10);
    }

    // Build dynamic query
    const fields = [];
    const values = [];
    let idx = 1;

    if (username) { fields.push(`username = $${idx++}`); values.push(username); }
    if (email) { fields.push(`email = $${idx++}`); values.push(email); }
    if (phone) { fields.push(`phone = $${idx++}`); values.push(phone); }
    if (newPassword) { fields.push(`password_hash = $${idx++}`); values.push(passwordHash); }

    fields.push(`updated_at = now()`);

    const query = `
      UPDATE tvet_profiles
      SET ${fields.join(", ")}
      WHERE id = $${idx}
      RETURNING id, username, email, phone, created_at, updated_at
    `;
    values.push(id);

    const result = await pool.query(query, values);

    res.json({ success: true, profile: result.rows[0] });
  } catch (error) {
    console.error("Error updating TVET profile:", error);
    res.status(500).json({ success: false, message: "Database error", error: error.message });
  }
}



//campany partnership controllers

// Add a new company partnership
export const addCompanyPartnership = async (req, res) => {
  const { name, industry, registration_date, status, contact } = req.body;

  if (!name || !status) {
    return res.status(400).json({ error: "Name and status are required" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO companies_partnership (name, industry, registration_date, status, contact)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, industry, registration_date, status, contact]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting company", err);
    res.status(500).json({ error: "Failed to add company" });
  }
};

// Get all companies grouped by status
export const getCompaniesByStatus = async (req, res) => {
  try {
    const registered = await pool.query(
      `SELECT * FROM companies_partnership WHERE status='registered' ORDER BY created_at DESC`
    );
    const pending = await pool.query(
      `SELECT * FROM companies_partnership WHERE status='pending' ORDER BY created_at DESC`
    );

    res.json({
      registered: registered.rows,
      pending: pending.rows,
      counts: {
        registered: registered.rowCount,
        pending: pending.rowCount,
      },
    });
  } catch (err) {
    console.error("Error fetching companies by status", err);
    res.status(500).json({ error: "Failed to fetch companies" });
  }
};

// ================================
// STATISTICS REPORT
// ================================
export async function insertStatisticsReport(req, res) {
  const { reportType, period, fileUrl } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO statistics_reports (report_type, period, file_url)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [reportType, period, fileUrl || null]
    );

    res.status(201).json({ success: true, report: result.rows[0] });
  } catch (error) {
    console.error("Error inserting statistics report:", error);
    res.status(500).json({ success: false, message: "Database error", error: error.message });
  }
}

// ================================
// COMPANIES PARTNERSHIP
// ================================
export async function insertCompanyPartnership(req, res) {
  const { name, industry, registrationDate, status, contact } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO companies_partnership (name, industry, registration_date, status, contact)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, industry || null, registrationDate || null, status, contact || null]
    );

    res.status(201).json({ success: true, partnership: result.rows[0] });
  } catch (error) {
    console.error("Error inserting company partnership:", error);
    res.status(500).json({ success: false, message: "Database error", error: error.message });
  }
}

// ================================
// OPPORTUNITIES
// ================================
export async function insertOpportunity(req, res) {
  const { name, companyId, sector, level, location, salary, positions, description, requirements, period, status } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO opportunities 
        (name, company_id, sector, level, location, salary, positions, description, requirements, period, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb, $10::jsonb, $11)
       RETURNING *`,
      [
        name,
        companyId || null,
        sector || null,
        level || null,
        location || null,
        salary || null,
        positions || 0,
        description || null,
        JSON.stringify(requirements || []),
        JSON.stringify(period || {}),
        status || "Active",
      ]
    );

    res.status(201).json({ success: true, opportunity: result.rows[0] });
  } catch (error) {
    console.error("Error inserting opportunity:", error);
    res.status(500).json({ success: false, message: "Database error", error: error.message });
  }
}

// ================================
// SKILLS FEEDBACK
// ================================
export async function insertSkillsFeedback(req, res) {
  const { skillName, category, currentLevel, desiredLevel, priority, feedback, trainingNeeded } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO skills_feedback (skill_name, category, current_level, desired_level, priority, feedback, training_needed)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        skillName,
        category || null,
        currentLevel || null,
        desiredLevel || null,
        priority || null,
        feedback || null,
        trainingNeeded || false,
      ]
    );

    res.status(201).json({ success: true, feedback: result.rows[0] });
  } catch (error) {
    console.error("Error inserting skills feedback:", error);
    res.status(500).json({ success: false, message: "Database error", error: error.message });
  }
}
