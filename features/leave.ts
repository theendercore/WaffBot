import { Client } from "discord.js";
import log from "../common/log";

export default (client: Client) => {
  client.on("guildMemberRemove", async (member) => {
    log("pp")
  });
};

const config = {
  displayName: "Leave Message",
  dbName: "LEAVE-MSG",
};

export { config };
