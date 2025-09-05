import express from "express";
import { addOpportunity, getOpportunities } from "../controllers/opportunity.controller.js";

const router = express.Router();

router.post("/", addOpportunity);
router.get("/", getOpportunities);

export default router;
