import { Router } from "express";
import { registerDonor, getDonors } from "../countrollers/donorController.js";

const router = Router();

router.post("/register", registerDonor);
router.get("/all", getDonors);

export default router;
