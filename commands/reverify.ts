import { TextChannel, GuildMember } from "discord.js";
import { ICommand } from "wokcommands";
import { sendDeleteMSG } from "../common/log";
import { varifyRole, welcomeChannel, getIfUseVerification } from "../common/vars";
import { attemptVerify } from "../common/attemptVerify";
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

    if (await getIfUseVerification(guild.id)) {
      sendDeleteMSG(message, channel, "Verification is not Enabled!");
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

    attemptVerify(message?.member as GuildMember, guild, WelcomeChannel);
    sendDeleteMSG(message, channel, "Done™️");
  },
} as ICommand;
