import express from "express";
import {
  addCompanyPartnership,
  getCompaniesByStatus,
  getAllCompanies,
  updateCompanyStatus,
} from "../controllers/companyPartnership.controller.js";

const router = express.Router();

router.post("/", addCompanyPartnership);         // add company
router.get("/status", getCompaniesByStatus);     // grouped by status + counts
router.get("/", getAllCompanies);                // list all
router.patch("/:id/status", updateCompanyStatus);// change status

export default router;
