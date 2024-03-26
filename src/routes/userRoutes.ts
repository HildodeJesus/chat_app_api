import { Router } from "express";

const router = Router();

router.get("/");
router.post("/login");
router.post("/validate_user");

export default router;
