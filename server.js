const express = require("express");
const cors = require("cors");
const { Connection, PublicKey } = require("@solana/web3.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Solana RPC connection
const connection = new Connection("https://api.mainnet-beta.solana.com");

// Home route
app.get("/", (req, res) => {
  res.send("✅ GGCTRL backend online + Solana connected!");
});

// Verify wallet route
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

// Link wallet (optional)
app.post("/connect", (req, res) => {
  const { walletAddress } = req.body;
  if (!walletAddress) return res.status(400).send("Missing wallet address");
  res.send(`Wallet ${walletAddress} linked successfully.`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
