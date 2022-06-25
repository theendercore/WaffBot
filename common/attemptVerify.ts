import { Guild, GuildMember, TextChannel } from "discord.js";
import { getAwatingVerifyRole, getVerifyRole } from "./vars";
import { v4 as uuidv4 } from "uuid";
import VerifyModel from "../models/VerifyModel";
import TempPasswordModel from "../models/TempPasswordModel";

export async function attemptVerify(
  member: GuildMember,
  guild: Guild,
  channel: TextChannel
) {
  member.roles.add(await getAwatingVerifyRole(guild.id));
  let dbMember = await VerifyModel.findById(member.id);
  if (dbMember == null) {
    await VerifyModel.create({
      _id: member.id,
      verifiedSerevrs: [{ serverID: member.guild.id, verified: false }],
    });
    let pas = uuidv4();
    await TempPasswordModel.create({
      serverID: member.guild.id,
      userID: member.id,
      password: pas,
    });
    tryDM(member, guild, pas, channel);
    return;
  }
  dbMember = dbMember.verifiedSerevrs;
  if (
    dbMember.find((server: any) => server.serverID == member.guild.id).verified === undefined ||
    !dbMember.find((server: any) => server.serverID == member.guild.id).verified
  ) {
    let pas = uuidv4();
    await TempPasswordModel.updateOne(
      { serverID: member.guild.id, userID: member.id },
      { $set: { password: pas } }
    );
    tryDM(member, guild, pas, channel);
    return;
  }
  member.roles.remove(await getAwatingVerifyRole(guild.id));
  member.roles.add(await getVerifyRole(guild.id));
  await member.send(`**you have been verified ! :)**`);
}

async function tryDM(
  member: GuildMember,
  guild: Guild,
  pas: string,
  channel: TextChannel
) {
  try {
    await member.send(
      `> **Welcome to ${guild}**` +
        `\nTo get in give me ur Mincruft acount` +
        `\nUse:\`\`\`/werify ${pas}\`\`\`` +
        `In the server:\`\`\`${process.env.MC_SERVER_IP}\`\`\``
    );
  } catch (e) {
    channel.send(
      "Hey <@" +
        member.id +
        '>. You need to enable "Allow Direct Messages from Server Members" to get verified!'
    );
  }
}
