import { Client, TextChannel } from "discord.js";
import log from "../common/log";
import { getLeaveChannel } from "../common/vars";

export default (client: Client) => {
  client.on("guildMemberRemove", async (member) => {
    const { guild } = member;
    let leaveChannel = await getLeaveChannel(guild.id);
    const channel = guild.channels.cache.find(
      (channel) => channel.id === leaveChannel
    ) as TextChannel;
    if (!channel) return;

    const welcomeEmbed = {
      color: 0x2c73de,
      title: `R.I.P. ${member.displayName}!`,
      description: `Hope you had a fun time!`,
      thumbnail: {
        url: member.displayAvatarURL(),
      },
    };
    channel.send({ embeds: [welcomeEmbed] });
    //Add send logs to log channel if enabled
  });
};

const config = {
  displayName: "Leave Message",
  dbName: "LEAVE-MSG",
};

export { config };
