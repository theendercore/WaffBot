import { ICommand } from "wokcommands";
import { logCantDel, sendDeleteMSG } from "../common/log";

export default {
  category: "Admin",
  description: "does internal things",

  slash: false,
  testOnly: true,

  expectedArgs: "<number1> <number2>",
  minArgs: 2,
  maxArgs: 2,

  permissions: ["ADMINISTRATOR"],
  callback: async ({ message, channel, args, client }) => {
    if (message?.member?.id != "968876125516365874") {
      sendDeleteMSG(message, channel, "Bot Only");
      return " ";
    }
    const serverID = args[0];
    const userID = args[1];

    var guild = client.guilds.cache.get(serverID);
    const member = await guild?.members.fetch(userID);
    member?.roles.remove("974622107843559444");
    member?.roles.add("974650288780763166");
    return "pp";
  },
} as ICommand;
