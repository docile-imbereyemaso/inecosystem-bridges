import pool from "../config/db.js";

// POST /api/opportunities
export const addOpportunity = async (req, res) => {
  try {
    const {
      name,
      company_id,
      sector,
      level,
      location,
      salary,
      positions,
      description,
      requirements,
      start_date,
      end_date,
      duration,
      status,
    } = req.body;

    if (!name || !company_id) {
      return res.status(400).json({ error: "name and company_id are required" });
    }

    const result = await pool.query(
      `INSERT INTO opportunities
        (name, company_id, sector, level, location, salary, positions,
         description, requirements, start_date, end_date, duration, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
       RETURNING *`,
      [
        name,
        company_id,
        sector || null,
        level || null,
        location || null,
        salary || null,
        positions || 0,
        description || null,
        requirements || [],
        start_date || null,
        end_date || null,
        duration || null,
        status || "Active",
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("addOpportunity error:", err);
    res.status(500).json({ error: "Failed to add opportunity" });
  }
};

// GET /api/opportunities
export const getOpportunities = async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT o.*, c.name as company
       FROM opportunities o
       LEFT JOIN companies_partnership c ON o.company_id = c.id
       ORDER BY o.created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error("getOpportunities error:", err);
    res.status(500).json({ error: "Failed to fetch opportunities" });
  }
};
