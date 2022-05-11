import { Role } from "discord.js";
import { ICommand } from "wokcommands";
import log, { logCantDel } from "../common/log";
import ReactRolesModdel from "../models/ReactRolesModdel";
import fs from "fs";
import path from "path";

/*
  RELOAD REACT ROLES
*/

export default {
  category: "Admin",
  description: "Realoads recation roles", // Required for slash commands

  slash: false,
  testOnly: true,

  permissions: ["ADMINISTRATOR"],

  callback: async ({ message, channel, guild }) => {
    if (guild == null) return "server only";

    let react_roles = null;

    try {
      react_roles = require("../data/roles.json");
    } catch {
      log("No rolles to add / remove" + react_roles);
    }
    if (react_roles == null) return "no rolles to add / remove";

    if ((await ReactRolesModdel.findById(guild.id)) == null) {
      await ReactRolesModdel.create({ _id: guild.id });
      log("New Discord server connected id : " + guild.id);
    }
    
    for (let i = 0; i < Object.keys(react_roles).length; i++) {
      if (react_roles[i].remove) {
        log("Try Remove Role : " + react_roles[i].emoji);

        await ReactRolesModdel.updateOne(
          { _id: guild.id },
          { $pull: { roleList: { id: react_roles[i].id } } }
        );

        log("Removed Role : " + react_roles[i].emoji);
      } else {
        log("Try Add Role : " + react_roles[i].emoji);

        let roleExists = false;

        let serchable = (
          await ReactRolesModdel.findOne(
            { _id: guild.id },
            { _id: 0, "roleList.id": 1 }
          )
        ).roleList;

        for (let j = 0; j < Object.keys(serchable).length; j++) {
          if (serchable[j].id == react_roles[i].id) {
            roleExists = true;
            log("Identical Role found!");
            break;
          }
        }
        if (!roleExists) {
          await ReactRolesModdel.updateOne(
            { _id: guild.id },
            {
              $push: {
                roleList: {
                  id: react_roles[i].id,
                  emoji: react_roles[i].emoji,
                  category: react_roles[i].category,
                },
              },
            }
          );
          log("Added Role : " + react_roles[i].emoji);
        }
      }

      log("Processed Role : " + react_roles[i].emoji);
    }
    
    fs.unlink("data/roles.json", (err) => {
      if (err) {
        log(err + "");
      } else {
        log("Old roles File deleted");
      }
    });

    channel.send("Working").then((sentMessage) => {
      setTimeout(() => sentMessage.delete().catch((err) => logCantDel()), 1000);
      setTimeout(() => message.delete().catch((err) => logCantDel()), 1000);
      return;
    });
  },
} as ICommand;
