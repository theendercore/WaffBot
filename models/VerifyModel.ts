import mongoose from "mongoose";
import { requiredString } from "./const";

const schema = new mongoose.Schema({
  _id: requiredString,
  verifiedSerevrs: [
    {
      serverID: requiredString,
      verified: {
        type: Boolean,
        required: true,
        minecraftUUID: String,
      },
    },
  ],
});

export default mongoose.model("VerifyModel", schema);
