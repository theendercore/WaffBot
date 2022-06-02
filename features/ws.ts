import { Client } from "discord.js";
import log from "../common/log";
import WebSocket from "ws";
import { varifyRole, waitingVarifyRole } from "../common/vars";

export default async (client: Client) => {
  const wss = new WebSocket.Server({ port: 8080 });

  wss.on("connection", (ws) => {
    log("Connected Client");
    ws.on("message", async (d) => {
      let data = JSON.parse(d.toString());
      if (data == null || data.server === undefined) {
        log("Packet Error");
      }

      var guild = client.guilds.cache.get(data.server);
      const member = await guild?.members.fetch(data.user);
      log("A member has verified id: " + member?.user.tag);
      member?.roles.remove(waitingVarifyRole);
      member?.roles.add(varifyRole);
    });
    ws.on("close", (ws) => {
      log("Disconected");
    });
  });
};
const config = {
  displayName: "ws",
  dbName: "WS",
};

export { config };
