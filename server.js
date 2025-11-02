import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Connection, PublicKey } from "@solana/web3.js";
import linkRoutes from "./routes/link.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Solana RPC
const connection = new Connection("https://api.mainnet-beta.solana.com");

// Routes
app.get("/", (req, res) => {
  res.send("✅ GGCTRL backend online + Solana connected!");
});

app.get("/api/verify-wallet/:address", async (req, res) => {
  try {
    const { address } = req.params;
    const publicKey = new PublicKey(address);
    const balance = await connection.getBalance(publicKey);

    res.json({
      success: true,
      wallet: address,
      balance: balance / 1e9, // convert lamports to SOL
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "Invalid wallet or RPC issue",
    });
  }
});

// Use your link route
app.use("/api/link", linkRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
