import { ICommand } from "wokcommands";
import log, { sendDeleteMSG, sendDeleteReply } from "../common/log";
import { getIfUseVerification, getWelcomeChannel } from "../common/vars";

export default {
  category: "Admin",
  description: "Sets up the server for the bot",

  slash: false,

  permissions: ["ADMINISTRATOR"],
  callback: async ({ message, channel, guild }) => {
    log(await getIfUseVerification(guild?.id));
    log(await getWelcomeChannel(guild?.id));
    sendDeleteReply(message, channel, "pp");
  },
} as ICommand;
