import { Client } from "discord.js";
import log from "../common/log";
import WebSocket from "ws";

export default async (client: Client) => {
  const wss = new WebSocket.Server({ port: 8080 });

  wss.on("connection", (ws) => {
    log("on");
    ws.on("message", (d) => {
      let data = JSON.parse(d.toString());
      console.log(`Client data : ${data.PP} | ${d.toString()}`);
    });
  });
};
const config = {
  displayName: "ws",
  dbName: "WS",
};

export { config };
