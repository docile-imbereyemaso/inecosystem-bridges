/**
 * This file defines the routes related to student operations.
 * It currently includes a route to get all students.
 *
 * Add more routes for creating, updating, and deleting students as needed.
 */
import express, { Router } from "express";



import { deleteStudent, getAllStudents,updateStudent,searchbyname, getStudent} from "../controllers/ineco.controller.js";



import {insertCompany,insertContribution,getContribution, insertInternship, insertJob, getCompanies, getJobs,getInternships, insertInsight} from "../controllers/companies.controller.js";
import {
  insertTvetProfile,
  insertStatisticsReport,
  insertCompanyPartnership,
  insertOpportunity,
  insertSkillsFeedback,
  getTvetProfile,
  updateTvetProfile,
  adminResetPassword,
  addCompanyPartnership,
  getCompaniesByStatus
  
} from "../controllers/tvet.controller.js";
const router = express.Router();


// import { createCompany } from "../controllers/companies.controller.js";

router.post("/companies", insertCompany);
router.post("/companyData", getCompanies);
router.post("/contributions", insertContribution);
router.get("/getContribution", getContribution);
router.post("/internships", insertInternship);
router.get("/getInternships", getInternships);
router.post("/jobs", insertJob);
router.get("/jobsData", getJobs)
router.post("/insertInsight", insertInsight);



// Tvet API are there 
// ================== INSERT ROUTES ==================
router.post("/tvet-profiles", insertTvetProfile);
router.get("/tvet-profiles/:id", getTvetProfile);
router.put("/tvet-profiles/:id", updateTvetProfile);
// admin reset passwords
router.post("/tvet-profiles/reset-password", adminResetPassword);

router.post("/statistics-reports", insertStatisticsReport);
router.post("/company-partnerships", insertCompanyPartnership);
router.post("/opportunities", insertOpportunity);
router.post("/skills-feedback", insertSkillsFeedback);



// campany partnership table


router.post("/", addCompanyPartnership);
router.get("/status", getCompaniesByStatus);
export default router;

