import pool from "../config/db.js";

const ALLOWED_STATUSES = new Set(["registered", "pending"]);

// POST /api/companies
export const addCompanyPartnership = async (req, res) => {
  try {
    let { name, industry, registration_date, status, contact } = req.body;

    if (!name) return res.status(400).json({ error: "name is required" });
    status = (status || "pending").toLowerCase();
    if (!ALLOWED_STATUSES.has(status)) {
      return res.status(400).json({ error: "status must be 'registered' or 'pending'" });
    }

    const result = await pool.query(
      `INSERT INTO companies_partnership (name, industry, registration_date, status, contact)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING id, name, industry, registration_date, status, contact, created_at`,
      [name, industry || null, registration_date || null, status, contact || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("addCompanyPartnership error:", err);
    res.status(500).json({ error: "Failed to add company" });
  }
};

// GET /api/companies/status
export const getCompaniesByStatus = async (_req, res) => {
  try {
    const registered = await pool.query(
      `SELECT id, name, industry, registration_date, status, contact, created_at
       FROM companies_partnership
       WHERE status='registered'
       ORDER BY created_at DESC`
    );
    const pending = await pool.query(
      `SELECT id, name, industry, registration_date, status, contact, created_at
       FROM companies_partnership
       WHERE status='pending'
       ORDER BY created_at DESC`
    );

    res.json({
      registered: registered.rows,
      pending: pending.rows,
      counts: { registered: registered.rowCount, pending: pending.rowCount },
    });
  } catch (err) {
    console.error("getCompaniesByStatus error:", err);
    res.status(500).json({ error: "Failed to fetch companies by status" });
  }
};

// GET /api/companies
export const getAllCompanies = async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, industry, registration_date, status, contact, created_at
       FROM companies_partnership
       ORDER BY created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error("getAllCompanies error:", err);
    res.status(500).json({ error: "Failed to fetch companies" });
  }
};

// PATCH /api/companies/:id/status
export const updateCompanyStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const next = (req.body?.status || "").toLowerCase();

    if (!ALLOWED_STATUSES.has(next)) {
      return res.status(400).json({ error: "status must be 'registered' or 'pending'" });
    }

    const result = await pool.query(
      `UPDATE companies_partnership
       SET status=$1
       WHERE id=$2
       RETURNING id, name, industry, registration_date, status, contact, created_at`,
      [next, id]
    );

    if (result.rowCount === 0) return res.status(404).json({ error: "Company not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error("updateCompanyStatus error:", err);
    res.status(500).json({ error: "Failed to update status" });
  }
};
