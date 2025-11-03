import express from "express";
import Link from "../models/Link.js";
import { PublicKey } from "@solana/web3.js";

const router = express.Router();

// Create or verify a link between Minecraft user and wallet
router.post("/", async (req, res) => {
  try {
    const { minecraftUser, wallet } = req.body;

    // Validate input
    if (!minecraftUser || !wallet)
      return res.status(400).json({ success: false, error: "Missing fields" });

    // Validate Solana wallet format
    try {
      new PublicKey(wallet);
    } catch {
      return res.status(400).json({ success: false, error: "Invalid wallet address" });
    }

    // Check if wallet is already linked
    const existing = await Link.findOne({ wallet });
    if (existing)
      return res.status(400).json({ success: false, error: "Wallet already linked" });

    // Create new link record
    const link = new Link({ minecraftUser, wallet });
    await link.save();

    res.json({ success: true, message: "Wallet linked successfully", link });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// Get all linked users (optional admin route)
router.get("/", async (req, res) => {
  try {
    const links = await Link.find();
    res.json({ success: true, links });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

export default router;
