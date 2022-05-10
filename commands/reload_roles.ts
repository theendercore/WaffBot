<<<<<<< HEAD
import { ICommand } from 'wokcommands'
import log from '../common/log'
import { react_roles } from '../common/vars'
=======
import { Role } from "discord.js";
import { ICommand } from "wokcommands";
import log, { logCantDel } from "../common/log";
import { react_roles } from "../common/vars";
import ReactRolesModdel from "../models/ReactRolesModdel";
>>>>>>> fc72cbc (finished reaload roles comand)

export default {
  category: 'Admin',
  description: 'Realoads recation roles', // Required for slash commands

  slash: false,
  testOnly: true,

  permissions: ['ADMINISTRATOR'],

<<<<<<< HEAD
  callback: ({ message, channel, guild }) => {
<<<<<<< HEAD
    if (guild == null) return "server only"
=======
    if (guild == null) return "server only";
<<<<<<< HEAD
>>>>>>> fc72cbc (finished reaload roles comand)

=======
=======
  callback: async ({ message, channel, guild }) => {
    if (guild == null) return "server only";
>>>>>>> 68cf080 (fixed my boo boos)
    if (react_roles == null) return "no rolles to add / remove";
    let entry = await ReactRolesModdel.findById(guild.id);
    if (entry == null) {
      await ReactRolesModdel.create({_id:guild.id})
      log("New Discord server connected id : " + guild.id)
    }
    for (let i = 0; i < Object.keys(react_roles).length; i++) {
<<<<<<< HEAD
      log(react_roles[i].name + " " + react_roles[i].emoji)

      if(react_roles[i].delete){
        log("remove roles")
        // let del = guild.roles.cache.find(rol => rol.name == react_roles[i].name)
        // if (del==null){return "oh no"}
        // guild.roles.delete(del)
      }else if (react_roles[i].id == "") {
        log("add roles")
        //   guild.roles.create({
        //       name: react_roles[i].name,
        //       color: react_roles[i].color,
        //   })
        //   .then(console.log)
        //   .catch(console.error);
      }

      log("finish loop")
=======
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
>>>>>>> 68cf080 (fixed my boo boos)
    }

<<<<<<< HEAD
    return ":)"
=======
    channel.send("Working").then((sentMessage) => {
      setTimeout(
        () =>
          sentMessage
            .delete()
            .catch((err) => logCantDel()),
        1000
      );
      setTimeout(
        () =>
          message.delete().catch((err) => logCantDel()),
        1000
      );
      return;
    });
>>>>>>> fc72cbc (finished reaload roles comand)
  },
} as ICommand