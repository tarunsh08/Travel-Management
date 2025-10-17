import { Router } from "express";
import { getUserProfile } from "../controllers/user.controller.js";

const router = Router();

router.get("/v1/profile", getUserProfile);

export default router;
