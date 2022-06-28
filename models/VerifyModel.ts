import mongoose from "mongoose";
import { requiredString } from "./const";

const schema = new mongoose.Schema({
  _id: requiredString,
  verifiedSerevrs: [
    {
      serverID: requiredString,
      minecraftUUID: String,
      verified: {
        type: Boolean,
        required: true,
      },
    },
  ],
});

export default mongoose.model("VerifyModel", schema);
