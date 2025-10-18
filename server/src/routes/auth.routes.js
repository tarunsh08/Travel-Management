import { Router } from "express";
import { registerUser } from "../controllers/auth.controller.js";
import { loginUser } from "../controllers/auth.controller.js";
import { logoutUser } from "../controllers/auth.controller.js";

const router = Router();

router.post("/v1/register", registerUser);
router.post("/v1/login", loginUser);
router.post("/v1/logout", logoutUser);

export default router;
