import { Client, TextChannel } from "discord.js";
import WOKCommands from "wokcommands";
import log from "../common/log";
import { v4 as uuidv4 } from "uuid";
import VerifyModel from "../models/VerifyModel";
import TempPasswordModel from "../models/TempPasswordModel";
import "dotenv/config";

export default (client: Client) => {
  client.on("guildMemberAdd", async (member) => {
    log(member.displayName + " joined!");
    const { guild } = member;

    const channel = guild.channels.cache.find(
      (channel) => channel.id === "969277045404229652"
    ) as TextChannel;
    if (!channel) return;

    const welcomeEmbed = {
      color: 0xdfa32c,
      title: `Hello ${member.displayName}!`,
      description: `Hope you have a fun time :)\nChek your DM's!`,
      thumbnail: {
        url: member.displayAvatarURL(),
      },
    };

    channel.send({ embeds: [welcomeEmbed] });
    member.roles.add("974622107843559444");
    let dbMember = await VerifyModel.findById(member.id);
    if (dbMember == null) {
      await VerifyModel.create({
        _id: member.id,
        verifiedSerevrs: [{ serverID: member.guild.id, verified: false }],
      });
      let pas = uuidv4();
      await TempPasswordModel.create({
        _id: member.guild.id,
        userID: member.id,
        password: pas,
      });
      member.send(
        `> **Welcome to ${guild}**` +
          `\nTo get in give me ur Mincruft acount` +
          `\nUse \`/verify ${pas}\` in the server \`${process.env.SERVER_IP}\``
      );
      return;
    }
    dbMember = dbMember.verifiedSerevrs;
    if (
      !dbMember.find((server: any) => server.serverID == member.guild.id)
        .verified
    ) {
      let pas = uuidv4();
      await TempPasswordModel.updateOne(
        { _id: member.guild.id },
        { $set: { password: pas } }
      );
      await member.send(
        `> **Welcome to ${guild}**` +
          `\nTo get in give me ur Mincruft acount` +
          `\nUse \`/verify ${pas}\` in the server \`${process.env.SERVER_IP}\``
      );
      return;
    }
    member.roles.remove("974622107843559444");
    member.roles.add("974650288780763166");
  });
};

const config = {
  displayName: "Welcome Message",
  dbName: "WELCOME-MSG",
};

export { config };
