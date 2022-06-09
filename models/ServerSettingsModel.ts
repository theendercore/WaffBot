import mongoose from "mongoose";
import { requiredboolean, requiredString } from "./const";

const schema = new mongoose.Schema({
  _id: requiredString,
  channels: {
    joinChannel: requiredString,
    leaveChannel: requiredString,
    logChannel: String,
  },
  verification: {
    useVerification: requiredboolean,
    verifyRole: String,
    waitingVarifyRole: String,
  },
  reactRoles: {
    useReactRoles: requiredboolean,
    reactRoleChannel: {
      id: String,
      messageId: String,
    },
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
