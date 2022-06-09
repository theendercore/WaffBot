import { TextChannel, GuildMember } from "discord.js";
import { ICommand } from "wokcommands";
import { sendDeleteMSG } from "../common/log";
import { varifyRole, welcomeChannel } from "../common/vars";
import { getVerify } from "../common/getVerify";

export default {
  category: "User",
  description: "ReVerifys the user",

  slash: false,

  callback: async ({ message, channel, guild }) => {
    if (message?.member?.roles?.cache.get(varifyRole)) {
      sendDeleteMSG(message, channel, "You already are verified!");
      return;
    }
    if (guild == null) {
      sendDeleteMSG(message, channel, "Only in Servers :)");
      return "";
    }
    const WelcomeChannel = guild.channels.cache.find(
      (WelcomeChannel) => WelcomeChannel.id === welcomeChannel
    ) as TextChannel;
    if (!WelcomeChannel) return "oh no";

    getVerify(message?.member as GuildMember, guild, WelcomeChannel);
    sendDeleteMSG(message, channel, "Done™️");
  },
} as ICommand;
