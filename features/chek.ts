import { Client, TextChannel } from "discord.js";
import log from "../common/log";

export default async (client: Client) => {
  client.on("messageCreate", async (message) => {
    if (message.author.id === "976519000420925520") {
      // message.channel.send("pp")
      // let pp = message.content
      let jsonData = JSON.parse(message.content);

      var guild = client.guilds.cache.get(jsonData.server);
      const member = await guild?.members.fetch(jsonData.user);
      log("A member has verified id: " + member?.user.tag);
      member?.roles.remove("974622107843559444");
      member?.roles.add("974650288780763166");
      message.delete()
    }
  });
};
const config = {
  displayName: "check",
  dbName: "CHECK",
};

export { config };
