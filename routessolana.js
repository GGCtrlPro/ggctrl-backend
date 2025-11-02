import express from "express";
import { Connection, PublicKey } from "@solana/web3.js";
import Link from "./models/Link.js"; // import the model (you’ll create this next)

const router = express.Router();

// Solana RPC connection
const connection = new Connection("https://api.mainnet-beta.solana.com");

// ✅ Verify wallet balance (same as before)
router.get("/verify-wallet/:address", async (req, res) => {
  try {
    const { address } = req.params;
    const publicKey = new PublicKey(address);

    const balance = await connection.getBalance(publicKey);

    res.json({
      success: true,
      wallet: address,
      balance: balance / 1e9, // lamports → SOL
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: "Invalid wallet address or RPC error",
    });
  }
});

// 🆕 Link a Minecraft player to a wallet
router.post("/link-wallet", async (req, res) => {
  try {
    const { minecraftUser, wallet } = req.body;

    if (!minecraftUser || !wallet)
      return res.status(400).json({ error: "Missing user or wallet" });

    // check if wallet already exists
    const existing = await Link.findOne({ wallet });
    if (existing)
      return res.status(400).json({ error: "Wallet already linked" });

    // create new link
    const link = new Link({ minecraftUser, wallet });
    await link.save();

    res.json({
      success: true,
      message: "Wallet linked successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while linking wallet" });
  }
});

export default router;
