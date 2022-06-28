import { Client } from "discord.js";
import log from "../common/log";
import WebSocket from "ws";
import { getAwatingVerifyRole, getVerifyRole } from "../common/vars";

export default async (client: Client) => {
  const PORT = 7784;
  const wss = new WebSocket.Server({ port: PORT });
  wss.on("connection", (ws) => {
    log("Verify Server Connected");
    ws.on("message", async (d) => {
      let data = JSON.parse(d.toString());
      if (
        data == null ||
        data.server === undefined ||
        data.user === undefined
      ) {
        log("Packet Error!");
      }

      var guild = client.guilds.cache.get(data.server);
      const member = await guild?.members.fetch(data.user);
      // log("A member has verified id: " + member?.user.tag);
      member?.roles.remove(await getAwatingVerifyRole(data.server));
      member?.roles.add(await getVerifyRole(data.server));
      await member?.send(`**you have been verified ! :)**`);
    });
    ws.on("close", (ws) => {
      log("Verify Server Disconected");
    });
  });
};
const config = {
  displayName: "ws",
  dbName: "WS",
};

export { config };
