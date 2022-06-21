import { TextChannel, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import log, { logCantDel, sendDeleteMSG, sendDeleteReply } from "../common/log";
import fs from "fs";
import path from "path";
import { use_rr } from "../common/vars";
import ServerSettingsModel from "../models/ServerSettingsModel";

/*
  RRR = RELOAD REACT ROLES
  rrc = react roles channel
*/

export default {
  category: "Admin",
  description: "Realoads recation roles",

  slash: false,

  permissions: ["ADMINISTRATOR"],

  callback: async ({ message, channel, guild, interaction }) => {
    /*
-------------------Basic Setup-------------------
*/
    if (guild == null) {
      sendDeleteMSG(message, channel, "Only in Servers :)");
      return "";
    }

    if (use_rr) {
      sendDeleteMSG(message, channel, "React Roles are not Enabled!");
      return "";
    }

    let react_roles: any = null;
    //-------------------Crete New Things-------------------
    if (
      (await ServerSettingsModel.findById(guild.id)).channels
        .reactRoleChannel == "{}"
    ) {
      // log("move the code to here");
      log("New Discord server connected | id-" + guild.id);
      let rrcID = "0";
      let rrcMsgID = "0";
      const rrc = await guild.channels
        .create("react-roles", { reason: "Get ur roles here!" })
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

      await ServerSettingsModel.updateOne(
        { _id: guild.id },
        {
          $set: {
            "channels.reactRoleChannel": { id: rrcID, messageId: rrcMsgID },
          },
        }
      );
    }

    try {
      react_roles = require("../data/roles.json");
    } catch {
      log("ReactRoles file is not Prestint");
    }

    if (react_roles == null) {
      sendDeleteReply(message, channel, "No rolles to add or remove");
    } else {
      //-------------------Loading In Roles-------------------
      for (let i = 0; i < Object.keys(react_roles).length; i++) {
        if (react_roles[i].remove) {
          await ServerSettingsModel.updateOne(
            { _id: guild.id },
            { $pull: { "reactRoles.roleList": { id: react_roles[i].id } } }
          );

          //Removed Role
        } else {
          //Add Role Start

          let roleExists = false;

          let currentRoles = (
            await ServerSettingsModel.findOne(
              { _id: guild.id },
              { _id: 0, "reactRoles.roleList.id": 1 }
            )
          ).roleList;
          if (!(currentRoles == null)) {
            for (let j = 0; j < Object.keys(currentRoles).length; j++) {
              if (currentRoles[j].id == react_roles[i].id) {
                roleExists = true;
                //Identical Role found
                break;
              }
            }
          }
          if (!roleExists) {
            await ServerSettingsModel.updateOne(
              { _id: guild.id },
              {
                $push: {
                  "reactRoles.roleList": {
                    id: react_roles[i].id,
                    emoji: react_roles[i].emoji,
                    category: react_roles[i].category,
                    description: react_roles[i].description,
                  },
                },
              }
            );
            // Aded role
          }
        }
        //Processed role
      }
      sendDeleteReply(message, channel, "Processed Roles");
      //-------------------Deleting the roles.json------------------
      /*
              AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
              AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
              AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
              AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
              AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
      */

      // fs.unlink("data/roles.json", (err) => {
      //   if (err) {
      //     log(err + "");
      //   } else {
      //     log("Old roles File deleted");
      //   }
      // });
    }

    //-------------------Set up Roles Channel------------------
    let EMOJIS: any = [];
    let categorys: any = [];
    let sentEmbed = " ";
    const sendEmbed = [
      new MessageEmbed()
        .setColor(0xdfa32c)
        .setTitle("React Roles")
        .setDescription("Here you can get your roles by reacting :)"),
    ];

    let dbRoles = (
      await ServerSettingsModel.findOne(
        { _id: guild.id },
        { _id: 0, reactRoles: 1 }
      )
    ).reactRoles.roleList;

    let rrcInfo = (
      await ServerSettingsModel.findOne(
        { _id: guild.id },
        { _id: 0, channels: 1 }
      )
    ).channels.reactRoleChannel;

    let rrcMSG = await (
      (await guild.channels.fetch(rrcInfo.id)) as TextChannel
    ).messages.fetch(rrcInfo.messageId);

    for (let l = 0; l < Object.keys(dbRoles).length; l++) {
      EMOJIS[l] = dbRoles[l].emoji;
      categorys[l] = dbRoles[l].category;
    }

    let CATEGORYS = [...new Set(categorys)];

    CATEGORYS.forEach((element) => {
      const result = dbRoles.filter((obj: any) => obj.category === element);
      let embed = new MessageEmbed().setColor(
        `#${Math.floor(Math.random() * 16777215).toString(16)}`
      );
      if (element != undefined) {
        embed.setTitle(element + "");
        sentEmbed += "**" + element + "**\n";
      }
      let Desc: string = "";
      result.forEach((obj: any) => {
        const ROLE = message?.guild?.roles?.cache?.find(
          (role) => role.id == obj.id
        );
        Desc +=
          obj.emoji +
          `  ${ROLE ? `${ROLE}` : "role not found big yaiks"}` +
          " - `" +
          obj.description +
          "`\n";
      });
      sendEmbed.push(embed.setDescription(Desc));
    });

    try {
      await rrcMSG.edit({ embeds: sendEmbed });
      await EMOJIS.forEach((emoji: any) => rrcMSG.react(emoji));
    } catch {
      sendDeleteMSG(message, channel, "Oh no");
      return "";
    }

    sendDeleteMSG(message, channel, "Done™️");

    return "";
  },
} as ICommand;
