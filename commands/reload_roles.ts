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

  callback: ({ message, channel, guild }) => {
<<<<<<< HEAD
    if (guild == null) return "server only"
=======
    if (guild == null) return "server only";
<<<<<<< HEAD
>>>>>>> fc72cbc (finished reaload roles comand)

=======
    if (react_roles == null) return "no rolles to add / remove";
    let entry = await ReactRolesModdel.findById(guild.id);
    if (entry == null) {
      await ReactRolesModdel.create({_id:guild.id})
      log("New Discord server connected id : " + guild.id)
    }
>>>>>>> 12b1a91 (finished reaload roles comand)
    for (let i = 0; i < Object.keys(react_roles).length; i++) {
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