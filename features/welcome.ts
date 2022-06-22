import { Client, TextChannel } from "discord.js";
import { getIfUseVerification, getWelcomeChannel } from "../common/vars";
import { attemptVerify } from "../common/attemptVerify";

export default (client: Client) => {
  client.on("guildMemberAdd", async (member) => {
    const { guild } = member;
    let welcomeChannel = await getWelcomeChannel(guild.id);
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

    if (await getIfUseVerification(guild.id)) {
      attemptVerify(member, guild, channel);
    }
  });
};

const config = {
  displayName: "Welcome Message",
  dbName: "WELCOME-MSG",
};

export { config };
