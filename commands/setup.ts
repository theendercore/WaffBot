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

    let joinC = "0",
      leaveC = "0",
      verification = false,
      reactRoles = false,
      setupFile: any = null,
      verifyR = "0",
      awaitingVerifyR = "0";

    try {
      setupFile = require("../data/setup.json");
    } catch {
      sendDeleteMSG(message, channel, "Set Up file not Present!");
      return "";
    }

    if (
      setupFile.joinChannel === null ||
      setupFile.leaveChannel === null ||
      setupFile.verification === null ||
      setupFile.reactRoles === null
    ) {
      sendDeleteReply(message, channel, "Setup File Incorect or Empty!");
      return "";
    }

    if (
      setupFile.verification === true &&
      (setupFile.verifyR === null ||
        setupFile.awaitingVerifyR === null ||
        setupFile.verifyR === undefined ||
        setupFile.awaitingVerifyR === undefined)
    ) {
      sendDeleteReply(
        message,
        channel,
        "Veridication Setup Incorect or Empty!"
      );
      return "";
    }

    joinC = setupFile.joinChannel;
    leaveC = setupFile.leaveChannel;
    verification = setupFile.verification;
    reactRoles = setupFile.reactRoles;
    verifyR = setupFile.verifyR;
    awaitingVerifyR = setupFile.awaitingVerifyR;

    //-------------------Crete New Server Settings-------------------
    if ((await ServerSettingsModel.findById(guild.id)) == null) {
      log("Connected Server : " + guild.id);
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
      log("Updated Server : " + guild.id);

      await ServerSettingsModel.updateOne(
        { _id: guild.id },
        {
          $set: {
            "verification.useVerification": verification,
            "reactRoles.useReactRoles": reactRoles,
            "channels.joinChannel": joinC,
            "channels.leaveChannel": leaveC,
          },
        }
      );
    }

    //-------------------Add Verification Roles-------------------
    if (verification) {
      log("verifi true");
      await ServerSettingsModel.updateOne(
        { _id: guild.id },
        {
          $set: {
            "verification.verifyRole": verifyR,
            "verification.awaitingVarifyRole": awaitingVerifyR,
          },
        }
      );
    }
    sendDeleteMSG(message, channel, "Done™️");
  },
} as ICommand;
