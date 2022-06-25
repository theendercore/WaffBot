import { ICommand } from "wokcommands";
import log, { sendDeleteMSG } from "../common/log";
import { getAwatingVerifyRole, getVerifyRole } from "../common/vars";

export default {
  category: "Admin",
  description: "Sets up the server for the bot",

  slash: false,

  permissions: ["ADMINISTRATOR"],
  callback: async ({ message, channel, guild }) => {
    sendDeleteMSG(message, channel, "pp");
  },
} as ICommand;
