import { Router } from "express";
import { getUserProfile } from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.get("/v1/profile", protect, getUserProfile);

export default router;
