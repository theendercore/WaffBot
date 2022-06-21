import { TextChannel, GuildMember } from "discord.js";
import { ICommand } from "wokcommands";
import log, { sendDeleteMSG, sendDeleteReply } from "../common/log";
import { varifyRole, welcomeChannel } from "../common/vars";
import { getVerify } from "../common/getVerify";
import ServerSettingsModel from "../models/ServerSettingsModel";

export default {
  category: "Admin",
  description: "Sets up the server for the bot",

  slash: false,

  permissions: ["ADMINISTRATOR"],
  callback: async ({ message, channel, guild }) => {
    if (guild == null) {
      sendDeleteMSG(message, channel, "Only in Servers :)");
      return "";
    }

    let joinC = "t",
      leaveC = "t",
      verification = false,
      reactRoles = false,
      setupFile: any = null;

    try {
      setupFile = require("../data/setup.json");
    } catch {
      log("Set Up file not Present!");
      sendDeleteMSG(message, channel, "Set Up file not Present!");
      return "";
    }

    if (setupFile === null) {
      log("Empty Setup File!");
      sendDeleteReply(message, channel, "Empty Setup File!");
      return "";
    }
    if (
      setupFile.joinChannel === null ||
      setupFile.leaveChannel === null ||
      setupFile.verification === null ||
      setupFile.reactRoles === null
    ) {
      log("Setup File Incorect!");
      sendDeleteReply(message, channel, "Setup File Incorect!");
      return "";
    }

    joinC = setupFile.joinChannel;
    leaveC = setupFile.leaveChannel;
    verification = setupFile.verification;
    reactRoles = setupFile.reactRoles;

    log(joinC + " | " + leaveC + " | " + verification + " | " + reactRoles);

    //-------------------Crete New Server Settings-------------------
    if ((await ServerSettingsModel.findById(guild.id)) == null) {
      log("New Discord server connected | id - " + guild.id);

      await ServerSettingsModel.create({
        _id: guild.id,
        "channels.joinChannel": joinC,
        "channels.leaveChannel": leaveC,
        "verification.useVerification": verification,
        "reactRoles.useReactRoles": reactRoles,
      });
    }

    sendDeleteMSG(message, channel, "Done™️");
  },
} as ICommand;
