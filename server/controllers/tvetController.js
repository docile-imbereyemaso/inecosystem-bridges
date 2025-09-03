import pool from "../config/db.js";
import { logger } from '../utils/logger.js';
import bcrypt from "bcrypt";

// ================================
// HELPER FUNCTIONS
// ================================

// Centralized error handling
const handleDatabaseError = (error, res, operation) => {
  logger.error(`Database ${operation} error:`, error);
  res.status(500).json({ 
    success: false, 
    message: "Database error", 
    error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
  });
};

// Input validation helper
const validateRequiredFields = (fields, data) => {
  const missing = fields.filter(field => !data[field]);
  return missing.length > 0 ? missing : null;
};

// ================================
// TVET PROFILES CONTROLLERS
// ================================

// INSERT TVET PROFILE
export async function insertTvetProfile(req, res) {
  const { username, email, phone, password } = req.body;

  // Validate required fields
  const missingFields = validateRequiredFields(['username', 'email', 'password'], req.body);
  if (missingFields) {
    return res.status(400).json({ 
      success: false, 
      message: "Missing required fields", 
      missing: missingFields 
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      message: "Invalid email format" 
    });
  }

  try {
    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT id FROM tvet_profiles WHERE email = $1 OR username = $2',
      [email, username]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ 
        success: false, 
        message: "User with this email or username already exists" 
      });
    }

    // Hash password before storing
    const saltRounds = 12; // Increased from 10 for better security
    const password_hash = await bcrypt.hash(password, saltRounds);

    const result = await pool.query(
      `INSERT INTO tvet_profiles (username, email, phone, password_hash)
       VALUES ($1, $2, $3, $4)
       RETURNING id, username, email, phone, created_at, updated_at`,
      [username, email, phone, password_hash]
    );

    logger.info(`New TVET profile created: ${username}`);
    
    res.status(201).json({ 
      success: true, 
      message: "TVET profile created successfully",
      tvet_profile: result.rows[0] 
    });
  } catch (error) {
    handleDatabaseError(error, res, 'insert');
  }
}

// UPDATE TVET PROFILE
export async function updateTvetProfile(req, res) {
  const { id } = req.params;
  const { username, email, phone } = req.body;

  // Validate ID
  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ 
      success: false, 
      message: "Invalid ID provided" 
    });
  }

  // Validate at least one field is provided
  if (!username && !email && !phone) {
    return res.status(400).json({ 
      success: false, 
      message: "At least one field must be provided for update" 
    });
  }

  // Validate email format if provided
  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid email format" 
      });
    }
  }

  try {
    const result = await pool.query(
      `UPDATE tvet_profiles 
       SET username = COALESCE($1, username), 
           email = COALESCE($2, email), 
           phone = COALESCE($3, phone), 
           updated_at = NOW()
       WHERE id = $4
       RETURNING id, username, email, phone, created_at, updated_at`,
      [username, email, phone, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "TVET profile not found" 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: "TVET profile updated successfully",
      tvet_profile: result.rows[0] 
    });
  } catch (error) {
    handleDatabaseError(error, res, 'update');
  }
}

// GET ALL TVET PROFILES (with pagination)
export async function getAllTvetProfiles(req, res) {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    // Get total count
    const countResult = await pool.query('SELECT COUNT(*) FROM tvet_profiles');
    const totalCount = parseInt(countResult.rows[0].count);

    // Get paginated results
    const result = await pool.query(
      `SELECT id, username, email, phone, created_at, updated_at 
       FROM tvet_profiles 
       ORDER BY created_at DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    res.status(200).json({ 
      success: true, 
      tvet_profiles: result.rows,
      pagination: {
        current_page: parseInt(page),
        total_pages: Math.ceil(totalCount / limit),
        total_count: totalCount,
        per_page: parseInt(limit)
      }
    });
  } catch (error) {
    handleDatabaseError(error, res, 'select');
  }
}

// GET TVET PROFILE BY ID
export async function getTvetProfileById(req, res) {
  const { id } = req.params;

  // Validate ID
  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ 
      success: false, 
      message: "Invalid ID provided" 
    });
  }

  try {
    const result = await pool.query(
      `SELECT id, username, email, phone, created_at, updated_at 
       FROM tvet_profiles 
       WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "TVET profile not found" 
      });
    }

    res.status(200).json({ 
      success: true, 
      tvet_profile: result.rows[0] 
    });
  } catch (error) {
    handleDatabaseError(error, res, 'select');
  }
}

// DELETE TVET PROFILE
export async function deleteTvetProfile(req, res) {
  const { id } = req.params;

  // Validate ID
  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ 
      success: false, 
      message: "Invalid ID provided" 
    });
  }

  try {
    const result = await pool.query(
      'DELETE FROM tvet_profiles WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "TVET profile not found" 
      });
    }

    logger.info(`TVET profile deleted: ID ${id}`);

    res.status(200).json({ 
      success: true, 
      message: "TVET profile deleted successfully" 
    });
  } catch (error) {
    handleDatabaseError(error, res, 'delete');
  }
}

// ================================
// STATISTICS REPORTS CONTROLLERS
// ================================

// INSERT STATISTICS REPORT
export async function insertStatisticsReport(req, res) {
  const { reportType, period, fileUrl } = req.body;

  // Validate required fields
  const missingFields = validateRequiredFields(['reportType', 'period'], req.body);
  if (missingFields) {
    return res.status(400).json({ 
      success: false, 
      message: "Missing required fields", 
      missing: missingFields 
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO statistics_reports (report_type, period, file_url)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [reportType, period, fileUrl || null]
    );

    res.status(201).json({ 
      success: true, 
      message: "Statistics report created successfully",
      statistics_report: result.rows[0] 
    });
  } catch (error) {
    handleDatabaseError(error, res, 'insert');
  }
}

// GET ALL STATISTICS REPORTS (with pagination and filtering)
export async function getAllStatisticsReports(req, res) {
  const { page = 1, limit = 10, reportType } = req.query;
  const offset = (page - 1) * limit;

  try {
    let whereClause = '';
    let queryParams = [limit, offset];
    
    if (reportType) {
      whereClause = 'WHERE report_type = $3';
      queryParams.push(reportType);
    }

    const result = await pool.query(
      `SELECT * FROM statistics_reports 
       ${whereClause}
       ORDER BY generated_at DESC
       LIMIT $1 OFFSET $2`,
      queryParams
    );

    // Get total count for pagination
    const countQuery = reportType 
      ? 'SELECT COUNT(*) FROM statistics_reports WHERE report_type = $1'
      : 'SELECT COUNT(*) FROM statistics_reports';
    const countParams = reportType ? [reportType] : [];
    const countResult = await pool.query(countQuery, countParams);
    const totalCount = parseInt(countResult.rows[0].count);

    res.status(200).json({ 
      success: true, 
      statistics_reports: result.rows,
      pagination: {
        current_page: parseInt(page),
        total_pages: Math.ceil(totalCount / limit),
        total_count: totalCount,
        per_page: parseInt(limit)
      }
    });
  } catch (error) {
    handleDatabaseError(error, res, 'select');
  }
}

// GET STATISTICS REPORT BY ID
export async function getStatisticsReportById(req, res) {
  const { id } = req.params;

  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ 
      success: false, 
      message: "Invalid ID provided" 
    });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM statistics_reports WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "Statistics report not found" 
      });
    }

    res.status(200).json({ 
      success: true, 
      statistics_report: result.rows[0] 
    });
  } catch (error) {
    handleDatabaseError(error, res, 'select');
  }
}

// UPDATE STATISTICS REPORT
export async function updateStatisticsReport(req, res) {
  const { id } = req.params;
  const { reportType, period, fileUrl } = req.body;

  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ 
      success: false, 
      message: "Invalid ID provided" 
    });
  }

  if (!reportType && !period && !fileUrl) {
    return res.status(400).json({ 
      success: false, 
      message: "At least one field must be provided for update" 
    });
  }

  try {
    const result = await pool.query(
      `UPDATE statistics_reports 
       SET report_type = COALESCE($1, report_type),
           period = COALESCE($2, period),
           file_url = COALESCE($3, file_url),
           updated_at = NOW()
       WHERE id = $4
       RETURNING *`,
      [reportType, period, fileUrl, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "Statistics report not found" 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: "Statistics report updated successfully",
      statistics_report: result.rows[0] 
    });
  } catch (error) {
    handleDatabaseError(error, res, 'update');
  }
}

// DELETE STATISTICS REPORT
export async function deleteStatisticsReport(req, res) {
  const { id } = req.params;

  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ 
      success: false, 
      message: "Invalid ID provided" 
    });
  }

  try {
    const result = await pool.query(
      'DELETE FROM statistics_reports WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "Statistics report not found" 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: "Statistics report deleted successfully" 
    });
  } catch (error) {
    handleDatabaseError(error, res, 'delete');
  }
}

// ================================
// COMPANIES PARTNERSHIP CONTROLLERS
// ================================

// INSERT COMPANY PARTNERSHIP
export async function insertCompanyPartnership(req, res) {
  const { name, industry, registrationDate, status, contact } = req.body;

  const missingFields = validateRequiredFields(['name', 'industry', 'status'], req.body);
  if (missingFields) {
    return res.status(400).json({ 
      success: false, 
      message: "Missing required fields", 
      missing: missingFields 
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO companies_partnership (name, industry, registration_date, status, contact)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, industry, registrationDate || null, status, contact || null]
    );

    res.status(201).json({ 
      success: true, 
      message: "Company partnership created successfully",
      company_partnership: result.rows[0] 
    });
  } catch (error) {
    handleDatabaseError(error, res, 'insert');
  }
}

// GET ALL COMPANY PARTNERSHIPS (with pagination and filtering)
export async function getAllCompanyPartnerships(req, res) {
  const { page = 1, limit = 10, status, industry } = req.query;
  const offset = (page - 1) * limit;

  try {
    let whereConditions = [];
    let queryParams = [];
    let paramIndex = 1;

    if (status) {
      whereConditions.push(`status = $${paramIndex++}`);
      queryParams.push(status);
    }

    if (industry) {
      whereConditions.push(`industry ILIKE $${paramIndex++}`);
      queryParams.push(`%${industry}%`);
    }

    const whereClause = whereConditions.length > 0 
      ? `WHERE ${whereConditions.join(' AND ')}` 
      : '';

    queryParams.push(limit, offset);

    const result = await pool.query(
      `SELECT * FROM companies_partnership 
       ${whereClause}
       ORDER BY created_at DESC
       LIMIT $${paramIndex++} OFFSET $${paramIndex++}`,
      queryParams
    );

    res.status(200).json({ 
      success: true, 
      company_partnerships: result.rows 
    });
  } catch (error) {
    handleDatabaseError(error, res, 'select');
  }
}

// GET COMPANY PARTNERSHIP BY ID
export async function getCompanyPartnershipById(req, res) {
  const { id } = req.params;

  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ 
      success: false, 
      message: "Invalid ID provided" 
    });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM companies_partnership WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "Company partnership not found" 
      });
    }

    res.status(200).json({ 
      success: true, 
      company_partnership: result.rows[0] 
    });
  } catch (error) {
    handleDatabaseError(error, res, 'select');
  }
}

// UPDATE COMPANY PARTNERSHIP
export async function updateCompanyPartnership(req, res) {
  const { id } = req.params;
  const { name, industry, registrationDate, status, contact } = req.body;

  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ 
      success: false, 
      message: "Invalid ID provided" 
    });
  }

  if (!name && !industry && !registrationDate && !status && !contact) {
    return res.status(400).json({ 
      success: false, 
      message: "At least one field must be provided for update" 
    });
  }

  try {
    const result = await pool.query(
      `UPDATE companies_partnership 
       SET name = COALESCE($1, name),
           industry = COALESCE($2, industry),
           registration_date = COALESCE($3, registration_date),
           status = COALESCE($4, status),
           contact = COALESCE($5, contact),
           updated_at = NOW()
       WHERE id = $6
       RETURNING *`,
      [name, industry, registrationDate, status, contact, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "Company partnership not found" 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: "Company partnership updated successfully",
      company_partnership: result.rows[0] 
    });
  } catch (error) {
    handleDatabaseError(error, res, 'update');
  }
}

// DELETE COMPANY PARTNERSHIP
export async function deleteCompanyPartnership(req, res) {
  const { id } = req.params;

  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ 
      success: false, 
      message: "Invalid ID provided" 
    });
  }

  try {
    const result = await pool.query(
      'DELETE FROM companies_partnership WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "Company partnership not found" 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: "Company partnership deleted successfully" 
    });
  } catch (error) {
    handleDatabaseError(error, res, 'delete');
  }
}

// ================================
// OPPORTUNITIES CONTROLLERS
// ================================

// INSERT OPPORTUNITY
export async function insertOpportunity(req, res) {
  const {
    name, companyId, sector, level, location, salary, 
    positions, description, requirements, period, status, applicants
  } = req.body;

  const missingFields = validateRequiredFields(['name'], req.body);
  if (missingFields) {
    return res.status(400).json({ 
      success: false, 
      message: "Missing required fields", 
      missing: missingFields 
    });
  }

  try {
    // Validate JSON fields
    let validatedRequirements = [];
    let validatedPeriod = {};

    if (requirements) {
      if (Array.isArray(requirements)) {
        validatedRequirements = requirements;
      } else {
        return res.status(400).json({ 
          success: false, 
          message: "Requirements must be an array" 
        });
      }
    }

    if (period && typeof period !== 'object') {
      return res.status(400).json({ 
        success: false, 
        message: "Period must be an object" 
      });
    } else if (period) {
      validatedPeriod = period;
    }

    const result = await pool.query(
      `INSERT INTO opportunities 
       (name, company_id, sector, level, location, salary, positions, description, requirements, period, status, applicants)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING *`,
      [
        name,
        companyId || null,
        sector || null,
        level || null,
        location || null,
        salary || null,
        positions || null,
        description || null,
        JSON.stringify(validatedRequirements),
        JSON.stringify(validatedPeriod),
        status || 'Active',
        applicants || 0
      ]
    );

    res.status(201).json({ 
      success: true, 
      message: "Opportunity created successfully",
      opportunity: result.rows[0] 
    });
  } catch (error) {
    handleDatabaseError(error, res, 'insert');
  }
}

// GET ALL OPPORTUNITIES (with filtering)
export async function getAllOpportunities(req, res) {
  const { page = 1, limit = 10, status, sector, level } = req.query;
  const offset = (page - 1) * limit;

  try {
    let whereConditions = [];
    let queryParams = [];
    let paramIndex = 1;

    if (status) {
      whereConditions.push(`status = $${paramIndex++}`);
      queryParams.push(status);
    }

    if (sector) {
      whereConditions.push(`sector ILIKE $${paramIndex++}`);
      queryParams.push(`%${sector}%`);
    }

    if (level) {
      whereConditions.push(`level = $${paramIndex++}`);
      queryParams.push(level);
    }

    const whereClause = whereConditions.length > 0 
      ? `WHERE ${whereConditions.join(' AND ')}` 
      : '';

    queryParams.push(limit, offset);

    const result = await pool.query(
      `SELECT * FROM opportunities 
       ${whereClause}
       ORDER BY created_at DESC
       LIMIT $${paramIndex++} OFFSET $${paramIndex++}`,
      queryParams
    );

    res.status(200).json({ 
      success: true, 
      opportunities: result.rows 
    });
  } catch (error) {
    handleDatabaseError(error, res, 'select');
  }
}

// GET OPPORTUNITY BY ID
export async function getOpportunityById(req, res) {
  const { id } = req.params;

  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ 
      success: false, 
      message: "Invalid ID provided" 
    });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM opportunities WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "Opportunity not found" 
      });
    }

    res.status(200).json({ 
      success: true, 
      opportunity: result.rows[0] 
    });
  } catch (error) {
    handleDatabaseError(error, res, 'select');
  }
}

// UPDATE OPPORTUNITY
export async function updateOpportunity(req, res) {
  const { id } = req.params;
  const {
    name, companyId, sector, level, location, salary,
    positions, description, requirements, period, status, applicants
  } = req.body;

  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ 
      success: false, 
      message: "Invalid ID provided" 
    });
  }

  try {
    // Validate JSON fields if provided
    let requirementsJson = null;
    let periodJson = null;

    if (requirements !== undefined) {
      if (Array.isArray(requirements)) {
        requirementsJson = JSON.stringify(requirements);
      } else {
        return res.status(400).json({ 
          success: false, 
          message: "Requirements must be an array" 
        });
      }
    }

    if (period !== undefined) {
      if (typeof period === 'object') {
        periodJson = JSON.stringify(period);
      } else {
        return res.status(400).json({ 
          success: false, 
          message: "Period must be an object" 
        });
      }
    }

    const result = await pool.query(
      `UPDATE opportunities 
       SET name = COALESCE($1, name),
           company_id = COALESCE($2, company_id),
           sector = COALESCE($3, sector),
           level = COALESCE($4, level),
           location = COALESCE($5, location),
           salary = COALESCE($6, salary),
           positions = COALESCE($7, positions),
           description = COALESCE($8, description),
           requirements = COALESCE($9::jsonb, requirements),
           period = COALESCE($10::jsonb, period),
           status = COALESCE($11, status),
           applicants = COALESCE($12, applicants),
           updated_at = NOW()
       WHERE id = $13
       RETURNING *`,
      [
        name, companyId, sector, level, location, salary, positions, description,
        requirementsJson, periodJson, status, applicants, id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "Opportunity not found" 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: "Opportunity updated successfully",
      opportunity: result.rows[0] 
    });
  } catch (error) {
    handleDatabaseError(error, res, 'update');
  }
}

// DELETE OPPORTUNITY
export async function deleteOpportunity(req, res) {
  const { id } = req.params;

  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ 
      success: false, 
      message: "Invalid ID provided" 
    });
  }

  try {
    const result = await pool.query(
      'DELETE FROM opportunities WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "Opportunity not found" 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: "Opportunity deleted successfully" 
    });
  } catch (error) {
    handleDatabaseError(error, res, 'delete');
  }
}

// ================================
// SKILLS FEEDBACK CONTROLLERS
// ================================

// INSERT SKILLS FEEDBACK
export async function insertSkillsFeedback(req, res) {
  const {
    skillName, category, currentLevel, desiredLevel,
    priority, feedback, trainingNeeded
  } = req.body;

  const missingFields = validateRequiredFields(['skillName'], req.body);
  if (missingFields) {
    return res.status(400).json({ 
      success: false, 
      message: "Missing required fields", 
      missing: missingFields 
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO skills_feedback 
       (skill_name, category, current_level, desired_level, priority, feedback, training_needed)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        skillName,
        category || null,
        currentLevel || null,
        desiredLevel || null,
        priority || null,
        feedback || null,
        trainingNeeded || false
      ]
    );

    res.status(201).json({ 
      success: true, 
      message: "Skills feedback created successfully",
      skills_feedback: result.rows[0] 
    });
  } catch (error) {
    handleDatabaseError(error, res, 'insert');
  }
}

// GET ALL SKILLS FEEDBACK (with filtering)
export async function getAllSkillsFeedback(req, res) {
  const { page = 1, limit = 10, category, priority } = req.query;
  const offset = (page - 1) * limit;

  try {
    let whereConditions = [];
    let queryParams = [];
    let paramIndex = 1;

    if (category) {
      whereConditions.push(`category = $${paramIndex++}`);
      queryParams.push(category);
    }

    if (priority) {
      whereConditions.push(`priority = $${paramIndex++}`);
      queryParams.push(priority);
    }

    const whereClause = whereConditions.length > 0 
      ? `WHERE ${whereConditions.join(' AND ')}` 
      : '';

    queryParams.push(limit, offset);

    const result = await pool.query(
      `SELECT * FROM skills_feedback 
       ${whereClause}
       ORDER BY created_at DESC
       LIMIT $${paramIndex++} OFFSET $${paramIndex++}`,
      queryParams
    );

    res.status(200).json({ 
      success: true, 
      skills_feedback: result.rows 
    });
  } catch (error) {
    handleDatabaseError(error, res, 'select');
  }
}

// GET SKILLS FEEDBACK BY ID
export async function getSkillsFeedbackById(req, res) {
  const { id } = req.params;

  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ 
      success: false, 
      message: "Invalid ID provided" 
    });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM skills_feedback WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "Skills feedback not found" 
      });
    }

    res.status(200).json({ 
      success: true, 
      skills_feedback: result.rows[0] 
    });
  } catch (error) {
    handleDatabaseError(error, res, 'select');
  }
}

// UPDATE SKILLS FEEDBACK
export async function updateSkillsFeedback(req, res) {
  const { id } = req.params;
  const {
    skillName, category, currentLevel, desiredLevel,
    priority, feedback, trainingNeeded
  } = req.body;

  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ 
      success: false, 
      message: "Invalid ID provided" 
    });
  }

  if (!skillName && !category && !currentLevel && !desiredLevel && !priority && !feedback && trainingNeeded === undefined) {
    return res.status(400).json({ 
      success: false, 
      message: "At least one field must be provided for update" 
    });
  }

  try {
    const result = await pool.query(
      `UPDATE skills_feedback 
       SET skill_name = COALESCE($1, skill_name),
           category = COALESCE($2, category),
           current_level = COALESCE($3, current_level),
           desired_level = COALESCE($4, desired_level),
           priority = COALESCE($5, priority),
           feedback = COALESCE($6, feedback),
           training_needed = COALESCE($7, training_needed),
           updated_at = NOW()
       WHERE id = $8
       RETURNING *`,
      [skillName, category, currentLevel, desiredLevel, priority, feedback, trainingNeeded, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "Skills feedback not found" 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: "Skills feedback updated successfully",
      skills_feedback: result.rows[0] 
    });
  } catch (error) {
    handleDatabaseError(error, res, 'update');
  }
}

// DELETE SKILLS FEEDBACK
export async function deleteSkillsFeedback(req, res) {
  const { id } = req.params;

  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ 
      success: false, 
      message: "Invalid ID provided" 
    });
  }

  try {
    const result = await pool.query(
      'DELETE FROM skills_feedback WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "Skills feedback not found" 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: "Skills feedback deleted successfully" 
    });
  } catch (error) {
    handleDatabaseError(error, res, 'delete');
  }
}