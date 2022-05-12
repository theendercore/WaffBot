import { Channel, Guild, Role, TextChannel, Message, Client } from "discord.js";
import { ICommand } from "wokcommands";
import log, { logCantDel, sendDeleteMSG, sendDeleteReply } from "../common/log";
import ReactRolesModdel from "../models/ReactRolesModdel";
import fs from "fs";
import path from "path";

/*
  RRR = RELOAD REACT ROLES
  rrc = react roles channel
*/

export default {
  category: "Admin",
  description: "Realoads recation roles", // Required for slash commands

  slash: false,
  testOnly: true,

  permissions: ["ADMINISTRATOR"],

  callback: async ({ message, channel, guild, interaction }) => {
    /*
-------------------Basic Setup-------------------
*/
    if (guild == null) {
      sendDeleteMSG(message, channel, "Only in Servers :)");
      return "";
    }

    let react_roles = null;
    //-------------------Crete New Things-------------------
    if ((await ReactRolesModdel.findById(guild.id)) == null) {
      log("New Discord server connected | id-" + guild.id);
      let rrcID = "8";
      let rrcMsgID = "8";
      const rrc = await guild.channels
        .create("react-roles", { reason: "Get ur roles here" })
        .then(async (result) => {
          log("A new React Roles Channel has been created | id-" + result.id);
          rrcID = result.id || "";
          await (result as TextChannel)
            .send({ content: "." })
            .then((message) => {
              log("Temp Message send | id-" + message.id);
              rrcMsgID = message.id;
            });
        });

      await ReactRolesModdel.create({
        _id: guild.id,
        reactRoleChannel: { id: rrcID, messageId: rrcMsgID },
      });
    }

    try {
      react_roles = require("../data/roles.json");
    } catch {
      log("No rolles to add / remove" + react_roles);
    }

    if (react_roles == null) {
      sendDeleteReply(message, channel, "No rolles to add || remove");
    } else {
      //-------------------Loading In Roles-------------------
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
      sendDeleteReply(message, channel, "Processed Roles");
      //-------------------Deleting the roles.json------------------
      fs.unlink("data/roles.json", (err) => {
        if (err) {
          log(err + "");
        } else {
          log("Old roles File deleted");
        }
      });
    }

    //-------------------Set up Roles Channel------------------
    let EMOJIS = [];
    let sentEmbed = "> **Hallo Roles pick pls**\n";

    let dbRoles = (
      await ReactRolesModdel.findOne({ _id: guild.id }, { _id: 0, roleList: 1 })
    ).roleList;

    let rrcInfo = (
      await ReactRolesModdel.findOne(
        { _id: guild.id },
        { _id: 0, reactRoleChannel: 1 }
      )
    ).reactRoleChannel;

    let rrcMSG = await (
      (await guild.channels.fetch(rrcInfo.id)) as TextChannel
    ).messages.fetch(rrcInfo.messageId);


    for (let l = 0; l < Object.keys(dbRoles).length; l++) {
      sentEmbed +=
        dbRoles[l].emoji + "  <@&" + dbRoles[l].id + ">  - `role desc`" + "\n";
      EMOJIS[l] = dbRoles[l].emoji;
    }

    try {
      await rrcMSG.edit(sentEmbed);
      await EMOJIS.forEach((emoji) => rrcMSG.react(emoji));
    } catch {
      sendDeleteMSG(message, channel, "Oh no");
      return "";
    }

    sendDeleteMSG(message, channel, "Done™️");
    return "";
  },
} as ICommand;
