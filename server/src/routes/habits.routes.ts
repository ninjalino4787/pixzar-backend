import { Router } from "express";
import { addhabits, deleteAllHabits, deletehabit, getAllHabits } from "../controllers/habits.controllers";
import { protectRoute } from "../middleware/auth.middleware";

const router: Router = Router();

router.route("/addhabit").post(protectRoute, addhabits)
router.route("/:habitId/deleteHabit").delete(protectRoute, deletehabit)
router.route("/getHabits").get(protectRoute, getAllHabits)
router.route("/deleteAllHabits").delete(protectRoute, deleteAllHabits)

export default router;