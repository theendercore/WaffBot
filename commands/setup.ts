import { TextChannel, GuildMember } from "discord.js";
import { ICommand } from "wokcommands";
import {  sendDeleteMSG } from "../common/log";
import { varifyRole, welcomeChannel } from "../common/vars";
import { getVerify } from "../common/getVerify";

export default {
  category: "User",
  description: "ReVerifys the user",

  slash: false,
  testOnly: true,

  permissions: ["ADMINISTRATOR"],
  callback: async ({ message, channel, guild }) => {

    sendDeleteMSG(message, channel, "Done™️");
  },
} as ICommand;
