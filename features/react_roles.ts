import axios from "axios";
import { Client } from "discord.js";
import log, { sendDeleteReply } from "../common/log";
import ServerSettingsModel from "../models/ServerSettingsModel";
import VerifyModel from "../models/VerifyModel";

export default async (client: Client) => {
  let dbRoles: any, rrcInfo: any;

  client.on("messageReactionAdd", async (reaction, user) => {
    code(reaction, user, dbRoles, rrcInfo, client, false);
  });

  client.on("messageReactionRemove", async (reaction, user) => {
    code(reaction, user, dbRoles, rrcInfo, client, true);
  });
};
const config = {
  displayName: "rr",
  dbName: "RR",
};

export { config };

async function code(
  reaction: any,
  user: any,
  dbRoles: any,
  rrcInfo: any,
  client: Client,
  remove: boolean
) {
  if (reaction.message.guildId == null) return;

  dbRoles = (
    await ServerSettingsModel.findOne(
      { _id: reaction.message.guildId },
      { _id: 0, reactRoles: 1 }
    )
  ).reactRoles.roleList;

  rrcInfo = (
    await ServerSettingsModel.findOne(
      { _id: reaction.message.guildId },
      { _id: 0, channels: 1 }
    )
  ).channels.reactRoleChannel;

  if (reaction.message.channelId != rrcInfo.id) return;
  if (reaction.message.id != rrcInfo.messageId) return;
  if (user.id == "968876125516365874") return;

  await dbRoles.forEach(async (obj: any) => {
    if (obj.emoji == reaction.emoji.name) {
      var guild = client.guilds.cache.get(reaction.message.guildId || "");
      const member = await guild?.members.fetch(user.id);
      const role = await guild?.roles.fetch(obj.id);
      if (remove) {
        member?.roles.remove(role || "");
        if (reaction.emoji.name === "🔴") {
          if (guild?.ownerId !== member?.id) {
            await member?.setNickname(member.user.username);
          }
        }
      } else {
        member?.roles.add(role || "");
        if (reaction.emoji.name === "🔴") {
          let userUUID: String = "0";
          let verServers = (
            await VerifyModel.findOne(
              { _id: member?.id },
              { _id: 0, verifiedSerevrs: 1 }
            )
          ).verifiedSerevrs;
          verServers.forEach((s: any) => {
            if (s.serverID === member?.guild.id) {
              userUUID = s.minecraftUUID;
            }
          });
          if (guild?.ownerId !== member?.id) {
            await axios
              .get(
                `https://sessionserver.mojang.com/session/minecraft/profile/${userUUID}`
              )
              .then(async function (response) {
                if (response.data.name === undefined) {
                  //log failed to get username from uuid
                  await member?.send(`There Seams to be an issue wiht gettting your username from mojang server.
                   Plaese DM @WafflesAreBetter#6519 or @Ender#8344 for help`);
                  return;
                }
                await member?.setNickname(response.data.name);
                log(`Addded ${response.data.name} to whitelist.`);
              })
              .catch(function (error) {
                log(error);
              });
          }
        }
      }
    }
  });
}
