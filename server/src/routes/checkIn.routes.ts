import { Router } from "express";
import { checkInHabit } from "../controllers/checkIn.controllers";
import {getCheckIns } from "../controllers/checkIn.controllers";
import { protectRoute } from "../middleware/auth.middleware";

const router: Router = Router();

router.route("/:habitId/checkInHabit").post(protectRoute, checkInHabit)
router.route("/:habitId/getCheckIns").get(protectRoute, getCheckIns)
export default router;