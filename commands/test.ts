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
    sendDeleteMSG(message, channel, "test")
  },
} as ICommand;
