import express from "express";
import {
  // TVET Profiles
  insertTvetProfile,
  updateTvetProfile,
  getAllTvetProfiles,
  getTvetProfileById,
  deleteTvetProfile,
  
  // Statistics Reports
  insertStatisticsReport,
  getAllStatisticsReports,
  getStatisticsReportById,
  updateStatisticsReport,
  deleteStatisticsReport,
  
  // Company Partnerships
  insertCompanyPartnership,
  getAllCompanyPartnerships,
  getCompanyPartnershipById,
  updateCompanyPartnership,
  deleteCompanyPartnership,
  
  // Opportunities
  insertOpportunity,
  getAllOpportunities,
  getOpportunityById,
  updateOpportunity,
  deleteOpportunity,
  
  // Skills Feedback
  insertSkillsFeedback,
  getAllSkillsFeedback,
  getSkillsFeedbackById,
  updateSkillsFeedback,
  deleteSkillsFeedback
} from "../controllers/tvetController.js";

const router = express.Router();

// ================================
// TVET PROFILES ROUTES
// ================================
router.post("/tvet-profiles", insertTvetProfile);
router.get("/tvet-profiles", getAllTvetProfiles);
router.get("/tvet-profiles/:id", getTvetProfileById);
router.put("/tvet-profiles/:id", updateTvetProfile);
router.delete("/tvet-profiles/:id", deleteTvetProfile);

// ================================
// STATISTICS REPORTS ROUTES
// ================================
router.post("/statistics-reports", insertStatisticsReport);
router.get("/statistics-reports", getAllStatisticsReports);
router.get("/statistics-reports/:id", getStatisticsReportById);
router.put("/statistics-reports/:id", updateStatisticsReport);
router.delete("/statistics-reports/:id", deleteStatisticsReport);

// ================================
// COMPANY PARTNERSHIPS ROUTES
// ================================
router.post("/companies-partnership", insertCompanyPartnership);
router.get("/companies-partnership", getAllCompanyPartnerships);
router.get("/companies-partnership/:id", getCompanyPartnershipById);
router.put("/companies-partnership/:id", updateCompanyPartnership);
router.delete("/companies-partnership/:id", deleteCompanyPartnership);

// ================================
// OPPORTUNITIES ROUTES
// ================================
router.post("/opportunities", insertOpportunity);
router.get("/opportunities", getAllOpportunities);
router.get("/opportunities/:id", getOpportunityById);
router.put("/opportunities/:id", updateOpportunity);
router.delete("/opportunities/:id", deleteOpportunity);

// ================================
// SKILLS FEEDBACK ROUTES
// ================================
router.post("/skills-feedback", insertSkillsFeedback);
router.get("/skills-feedback", getAllSkillsFeedback);
router.get("/skills-feedback/:id", getSkillsFeedbackById);
router.put("/skills-feedback/:id", updateSkillsFeedback);
router.delete("/skills-feedback/:id", deleteSkillsFeedback);

export default router;