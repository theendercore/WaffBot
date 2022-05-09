import { ICommand } from 'wokcommands'
import log from '../common/log'
import { react_roles } from '../common/vars'

export default {
  category: 'Admin',
  description: 'Realoads recation roles', // Required for slash commands

  slash: false,
  testOnly: true,

  permissions: ['ADMINISTRATOR'],

  callback: ({ message, channel, guild }) => {
    if (guild == null) return "server only"

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

    return ":)"
  },
} as ICommand