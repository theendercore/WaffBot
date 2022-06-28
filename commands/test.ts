import { ICommand } from "wokcommands";
import log, { sendDeleteMSG } from "../common/log";
import { getAwatingVerifyRole, getVerifyRole } from "../common/vars";
import ServerSettingsModel from "../models/ServerSettingsModel";

export default {
  category: "Test",
  description: "yuss",

  slash: false,

  callback: async ({ message, channel, guild }) => {
    const member = message.member;
    await ServerSettingsModel.updateOne(
      { _id: guild?.id },
      { $push: { "verification.verifiedUUIDs": "cock" } }
    );
    await ServerSettingsModel.updateOne(
      { _id: guild?.id },
      { $push: { "verification.verifiedUUIDs": "pp" } }
    );
  },
} as ICommand;
