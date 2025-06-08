import express from "express";
import {
  refreshToken,
  signin,
  signup,
} from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);

// refresh token:
router.get("/refreshtoken", refreshToken);

export default router;
