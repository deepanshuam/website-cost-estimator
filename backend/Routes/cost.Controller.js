// routes/costRoutes.js
import { Router } from "express";
import { calculateCost } from "../controller/cost.Controller.js";

const router = Router();

// Define the POST route for cost calculation
router.post("/calculate", calculateCost);

export default router;
