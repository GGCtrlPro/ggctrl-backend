const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ GGCTRL backend is online!');
});

app.post('/connect', (req, res) => {
  const { walletAddress } = req.body;
  if (!walletAddress) return res.status(400).send('Missing wallet address');
  res.send(`Wallet ${walletAddress} linked successfully.`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
