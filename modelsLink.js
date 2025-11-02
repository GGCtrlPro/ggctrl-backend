import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
  minecraftUser: { type: String, required: true },
  wallet: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Link", LinkSchema);
