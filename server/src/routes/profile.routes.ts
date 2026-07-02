import { Router } from "express";;
import { getProfile } from "../controllers/profile.controllers";
import { protectRoute } from "../middleware/auth.middleware";

const router: Router = Router();

router.route("/getProfile").get(protectRoute,getProfile)

export default router;