import DiscordJS, { Intents, Message, Options, Role } from "discord.js";
import WOKCommands from "wokcommands";
import path from "path";
import mongoose from "mongoose";
import "dotenv/config";
import log from "./common/log";
import ReactRolesModdel from "./models/ReactRolesModdel";
// import testSchema from './test-schema'

const guildID = "968877307638997032";

const client = new DiscordJS.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.DIRECT_MESSAGES,
  ],
});

client.on("ready", async () => {
  console.log("Waffles are better!");

  log(`Logged in as ` + client.user?.tag);

  new WOKCommands(client, {
    commandsDir: path.join(__dirname, "commands"),
    featuresDir: path.join(__dirname, "features"),
    typeScript: true,
    testServers: guildID,
    mongoUri: process.env.MONGO_URI,
  });
  log(`Setup Done!`);

  let x = await ReactRolesModdel.findOne({
    _id: guildID
  }, {_id:0,"roleList.emoji":1});
  log(x||"error");

});

client.login(process.env.TOKEN);
