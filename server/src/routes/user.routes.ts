import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/auth.controllers";
// import { loginUser } from "../controllers/user.controllers";


const router: Router = Router();

// end points forward request to controller layer
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);

export default router;