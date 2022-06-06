import mongoose from "mongoose";
import { requiredboolean, requiredString } from "./const";

const schema = new mongoose.Schema({
  _id: requiredString,
  channels: {
    joinChannel: requiredString,
    leaveChannel: requiredString,
    logChannel:requiredString,
  },
  verification: {
    useVerification: requiredboolean,
    verifyRole: requiredString,
    waitingVarifyRole: requiredString,
  },
  reactRoles: {
    useReactRoles: requiredboolean,
    reactRoleChannel: {
      id: requiredString,
      messageId: requiredString,
    },
    roleList: [
      {
        id: requiredString,
        emoji: requiredString,
        category: String,
        description: requiredString,
      },
    ],
  },
});

export default mongoose.model("ServerSettingsModel", schema);
