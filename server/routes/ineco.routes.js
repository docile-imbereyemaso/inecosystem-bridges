/**
 * This file defines the routes related to student operations.
 * It currently includes a route to get all students.
 *
 * Add more routes for creating, updating, and deleting students as needed.
 */
import express from "express";



import { deleteStudent, getAllStudents,updateStudent,searchbyname, getStudent} from "../controllers/ineco.controller.js";


import insertCompany from "../controllers/companies.controller.js";

const router = express.Router();


// import { createCompany } from "../controllers/companies.controller.js";

router.post("/companies", insertCompany);

export default router;

