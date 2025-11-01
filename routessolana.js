import express from "express";
import { Connection, PublicKey } from "@solana/web3.js";

const router = express.Router();

// Solana RPC connection
const connection = new Connection("https://api.mainnet-beta.solana.com");

router.get("/verify-wallet/:address", async (req, res) => {
  try {
    const { address } = req.params;
    const publicKey = new PublicKey(address);

    // Check balance
    const balance = await connection.getBalance(publicKey);

    res.json({
      success: true,
      wallet: address,
      balance: balance / 1e9, // Convert lamports to SOL
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: "Invalid wallet address or RPC error",
    });
  }
});

export default router;
