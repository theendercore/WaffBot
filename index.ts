import DiscordJS, { Intents, TextChannel } from "discord.js";
import WOKCommands from "wokcommands";
import path from "path";
import "dotenv/config";
import log from "./common/log";
import ServerSettingsModel from "./models/ServerSettingsModel";
import { officalVersion } from "./common/vars";

const guildID = process.env.T_GUILD;

const client = new DiscordJS.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
  ],
});

client.on("ready", async () => {
  log(`Starting up ${client.user?.tag} - ${officalVersion}`);

  new WOKCommands(client, {
    commandsDir: path.join(__dirname, "commands"),
    featuresDir: path.join(__dirname, "features"),
    typeScript: true,
    testServers: guildID,
    mongoUri: process.env.MONGO_URI,
  });

  //Cache all the react chats
  let servers = await ServerSettingsModel.find();
  servers.forEach(async (serverInfo: any) => {
    if (!serverInfo.reactRoles.useReactRoles) {
      log("No RR");
      return;
    }
    const inerGuild = await client.guilds.fetch(serverInfo._id);
    const inerChannel = inerGuild.channels.cache.get(
      serverInfo.channels.reactRoleChannel.id
    );

    if (inerChannel === undefined) {
      log("This should not happend. React Roles Channel not found!");
      return;
    }

    const inerMessage = await (inerChannel as TextChannel).messages.fetch(
      serverInfo.channels.reactRoleChannel.messageId
    );
  });

  log(`Setup Done!`);
});

client.login(process.env.TOKEN);
