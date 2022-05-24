import { Client, TextChannel } from "discord.js";
import log from "../common/log";
import { varifyRole, waitingVarifyRole } from "../common/vars";

export default async (client: Client) => {
  client.on("messageCreate", async (message) => {
    if (message.author.id === "976519000420925520") {
      let jsonData = JSON.parse(message.content);

      var guild = client.guilds.cache.get(jsonData.server);
      const member = await guild?.members.fetch(jsonData.user);
      log("A member has verified id: " + member?.user.tag);
      member?.roles.remove(waitingVarifyRole);
      member?.roles.add(varifyRole);
      message.delete()
    }
  });
};
const config = {
  displayName: "check",
  dbName: "CHECK",
};

export { config };
