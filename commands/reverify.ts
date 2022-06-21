import { TextChannel, GuildMember } from "discord.js";
import { ICommand } from "wokcommands";
import { sendDeleteMSG } from "../common/log";
import { use_rr, varifyRole, welcomeChannel } from "../common/vars";
import { getVerify } from "../common/getVerify";
import VerifyModel from "../models/VerifyModel";

export default {
  category: "User",
  description: "ReVerifys the user",

  slash: false,

  callback: async ({ message, channel, guild }) => {
    if (guild == null) {
      sendDeleteMSG(message, channel, "Only in Servers :)");
      return "";
    }

    if (use_rr) {
      sendDeleteMSG(message, channel, "React Roles are not Enabled!");
      return "";
    }

    if (
      message?.member?.roles?.cache.get(varifyRole) &&
      (await VerifyModel.findById(message.member.id)).verified
    ) {
      sendDeleteMSG(message, channel, "You already are verified!");
      return;
    }

    const WelcomeChannel = guild.channels.cache.find(
      (WelcomeChannel) => WelcomeChannel.id === welcomeChannel
    ) as TextChannel;

    if (!WelcomeChannel) {
      sendDeleteMSG(message, channel, "Welcome Channel Missing!");
      return "";
    }

    getVerify(message?.member as GuildMember, guild, WelcomeChannel);
    sendDeleteMSG(message, channel, "Done™️");
  },
} as ICommand;
