import axios from "axios";
import { Client } from "discord.js";
import log from "../common/log";
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
          if (guild?.ownerId !== reaction.author.id) {
            await member?.setNickname(member.user.username);
          }
          log("remove problem?");
        }
      } else {
        member?.roles.add(role || "");
        if (reaction.emoji.name === "🔴") {
          let userUUID: String = "0";
          (
            await VerifyModel.findOne(
              { _id: member?.user.id },
              { _id: 0, verifiedSerevrs: 1 }
            )
          ).verifiedSerevrs.forEach((s: any) => {
            if (s.serverID === member?.guild.id) {
              log(s.userUUID);
              userUUID = s.userUUID;
            }
          });
          if (guild?.ownerId !== reaction.member.id) {
            await axios
              .get(
                `https://sessionserver.mojang.com/session/minecraft/profile/${userUUID}`
              )
              .then(async function (response) {
                await member?.setNickname(response.data.name);
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
