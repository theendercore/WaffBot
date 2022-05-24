import { Client, TextChannel } from "discord.js";
import WOKCommands from "wokcommands";
import log from "../common/log";
import "dotenv/config";
import { welcomeChannel } from "../common/vars";
import { getVerify } from "../common/getVerify";

export default (client: Client) => {
  client.on("guildMemberAdd", async (member) => {
    log(member.displayName + " joined!");
    const { guild } = member;

    const channel = guild.channels.cache.find(
      (channel) => channel.id === welcomeChannel
    ) as TextChannel;
    if (!channel) return;

    const welcomeEmbed = {
      color: 0xdfa32c,
      title: `Hello ${member.displayName}!`,
      description: `Hope you have a fun time :)\nCheck your DM's!`,
      thumbnail: {
        url: member.displayAvatarURL(),
      },
    };

    channel.send({ embeds: [welcomeEmbed] });

    getVerify(member, guild, channel);
  });
};

const config = {
  displayName: "Welcome Message",
  dbName: "WELCOME-MSG",
};

export { config };
