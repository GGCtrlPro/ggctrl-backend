# GGCtrl Backend

Backend for the GGCtrl Minecraft x Solana integration.

## Overview
The backend connects Minecraft tournament data with Solana wallets to verify users, track match data, and distribute rewards.

## Current Endpoints
- `/verify-wallet`: Confirms a player's Solana public key.
- `/match/start`: Marks the start of a match.
- `/match/end`: Submits results and triggers reward logic.

## Tech
- Node.js + Express
- Solana Web3.js
- MongoDB (planned)
- Hosted on Render

## Roadmap
- [ ] Add wallet signature verification
- [ ] Add match start/end endpoints
- [ ] Connect to Minecraft plugin
- [ ] Automate payouts via Solana
