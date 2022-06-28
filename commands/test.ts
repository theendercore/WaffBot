import { ICommand } from "wokcommands";
import log, { sendDeleteMSG } from "../common/log";
import { getAwatingVerifyRole, getVerifyRole } from "../common/vars";

export default {
  category: "Test",
  description: "yuss",

  slash: false,

  callback: async ({ message, channel, guild }) => {
    const member = message.member;
    if (guild?.ownerId !== message.author.id) {
      await member?.setNickname(member.user.username);
      log("test was run");
      return "";
    }
    sendDeleteMSG(message, channel, "You are owner, to bad");
  },
} as ICommand;
