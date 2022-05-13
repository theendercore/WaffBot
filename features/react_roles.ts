import { Client, Message, TextChannel } from "discord.js";
import WOKCommands from "wokcommands";
import log from "../common/log";
import ReactRolesModdel from "../models/ReactRolesModdel";

export default async (client: Client, instance: WOKCommands) => {
  let dbRoles: any, rrcInfo: any;

  client.on("messageReactionAdd", async (reaction, user) => {
    code(reaction, user, dbRoles, rrcInfo, client, false);
  });

  client.on("messageReactionRemove", async (reaction, user) => {
    code(reaction, user, dbRoles, rrcInfo, client, true);
  });
};
const config = {
  displayName: "test",
  dbName: "TEST",
};

export { config };

async function code(reaction: any, user: any, dbRoles: any, rrcInfo: any, client: Client, remove: boolean) {
  if (reaction.message.guildId == null) return;

  dbRoles = (
    await ReactRolesModdel.findOne(
      { _id: reaction.message.guildId },
      { _id: 0, roleList: 1 }
    )
  ).roleList;

  rrcInfo = (
    await ReactRolesModdel.findOne(
      { _id: reaction.message.guildId },
      { _id: 0, reactRoleChannel: 1 }
    )
  ).reactRoleChannel;
  log(reaction.emoji.name + " : reaction added");
  if (reaction.message.channelId != rrcInfo.id) return;
  if (reaction.message.id != rrcInfo.messageId) return;
  if (user.id == "974290316532252696-974290318180618280") return;

  await dbRoles.forEach(async (obj: any) => {
    if (obj.emoji == reaction.emoji.name) {
      var guild = client.guilds.cache.get(reaction.message.guildId || "");
      const member = await guild?.members.fetch(user.id);
      const role = await guild?.roles.fetch(obj.id);
      if (remove) {
        member?.roles.remove(role || "");
        log("removed role - " + obj.emoji);
      } else {
        member?.roles.add(role || "");
        log("added role - " + obj.emoji);
      }
    }
  });
}
