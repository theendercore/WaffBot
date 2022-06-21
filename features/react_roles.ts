import { Client } from "discord.js";
import ServerSettingsModel from "../models/ServerSettingsModel";

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
      } else {
        member?.roles.add(role || "");
      }
    }
  });
}
