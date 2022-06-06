import mongoose from "mongoose";
import { requiredString } from "./const";

const schema = new mongoose.Schema({
  serverID: requiredString,
  userID: requiredString,
  minecraftUUID: String,
  password: requiredString,
});

export default mongoose.model("TempPasswordModel", schema);
