import { Request, Response } from "express";
import * as donorService from "../services/donorService.js";

export async function registerDonor(req: Request, res: Response) {
  try {
    console.log("📥 DATA FROM FRONTEND:", req.body);

    await donorService.registerDonorService(req.body);

    res.status(201).json({ message: "Donor registered successfully" });
  } catch (error: any) {
    console.error("❌ INSERT ERROR:", error);
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
}

export async function getDonors(req: Request, res: Response) {
  try {
    const donors = await donorService.getAllDonorsService();
    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch donors" });
  }
}
