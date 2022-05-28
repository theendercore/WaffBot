import {
  Channel,
  Guild,
  Role,
  TextChannel,
  Message,
  Client,
  Emoji,
  MessageEmbed,
  Collection,
  GuildMember,
} from "discord.js";
import { ICommand } from "wokcommands";
import log, { logCantDel, sendDeleteMSG, sendDeleteReply } from "../common/log";
import ReactRolesModel from "../models/ReactRolesModel";
import fs from "fs";
import path from "path";
import { varifyRole, welcomeChannel } from "../common/vars";
import { getVerify } from "../common/getVerify";

export default {
  category: "User",
  description: "ReVerifys the user",

  slash: false,
  testOnly: true,

  callback: async ({ message, channel, guild, interaction }) => {

    if(message?.member?.roles?.cache.get(varifyRole)){
      sendDeleteMSG(message, channel, "You already are verified!");
      return
    }
    if (guild == null) {
      sendDeleteMSG(message, channel, "Only in Servers :)");
      return "";
    }
    const WelcomeChannel = guild.channels.cache.find(
      (WelcomeChannel) => WelcomeChannel.id === welcomeChannel
    ) as TextChannel;
    if (!WelcomeChannel) return "oh no";

    getVerify(message?.member as GuildMember, guild, WelcomeChannel)
    sendDeleteMSG(message, channel, "Done™️");
  },
} as ICommand;
