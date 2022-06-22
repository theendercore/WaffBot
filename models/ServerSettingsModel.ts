import mongoose from "mongoose";
import { requiredboolean, requiredString } from "./const";

const schema = new mongoose.Schema({
  _id: requiredString,
  dataVersion:requiredString,
  channels: {
    joinChannel: requiredString,
    leaveChannel: requiredString,
    reactRoleChannel: {
      id: String,
      messageId: String,
    },
    logChannel: String,
  },
  verification: {
    useVerification: requiredboolean,
    verifyRole: String,
    awaitingVarifyRole: String,
  },
  reactRoles: {
    useReactRoles: requiredboolean,
    roleList: [
      {
        id: String,
        emoji: String,
        category: String,
        description: String,
      },
    ],
  },
});

export default mongoose.model("ServerSettingsModel", schema);
