import { ICommand } from "wokcommands";
import log, { sendDeleteMSG, sendDeleteReply } from "../common/log";
import { dataVersion } from "../common/vars";
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

    if (
      setupFile.joinChannel === null ||
      setupFile.leaveChannel === null ||
      setupFile.verification === null ||
      setupFile.reactRoles === null
    ) {
      log("Setup File Incorect!");
      sendDeleteReply(message, channel, "Setup File Incorect or Empty!");
      return "";
    }

    joinC = setupFile.joinChannel;
    leaveC = setupFile.leaveChannel;
    verification = setupFile.verification;
    reactRoles = setupFile.reactRoles;

    //-------------------Crete New Server Settings-------------------
    if ((await ServerSettingsModel.findById(guild.id)) == null) {
      log("New Discord server connected | id - " + guild.id);

      await ServerSettingsModel.create({
        _id: guild.id,
        dataVersion: dataVersion,
        "channels.joinChannel": joinC,
        "channels.leaveChannel": leaveC,
        "verification.useVerification": verification,
        "reactRoles.useReactRoles": reactRoles,
      });
    }
    //-------------------Update Server Settings-------------------
    if ((await ServerSettingsModel.findById(guild.id)) != null) {
      log("Updated Discord server | id - " + guild.id);

      await ServerSettingsModel.updateOne(
        { _id: guild.id },
        {
          $set: {
            "verification.useVerification": verification,
            "reactRoles.useReactRoles": reactRoles,
            channels: {
              joinChannel: joinC,
              leaveChannel: leaveC,
            },
          },
        }
      );
    }
    sendDeleteMSG(message, channel, "Done™️");
  },
} as ICommand;
