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
    let gg = channel.id
    let cc = guild.id

    log("cock "+gg)

    for (let i = 0; i < Object.keys(react_roles).length; i++) {
      log(react_roles[i].name + " " + react_roles[i].emoji)

      if (react_roles[i].id != "") { break; }
      // log(gg.username)
      // gg.roles.create({
      //     name: react_roles[i].name,
      //     color: react_roles[i].color,
      // })
      // .then(console.log)
      // .catch(console.error);
    }

    return ":)"
  },
} as ICommand