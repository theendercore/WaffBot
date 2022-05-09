import { ICommand } from 'wokcommands'
import log from '../common/log'
import { react_roles } from '../common/vars'

export default {
  category: 'Admin',
  description: 'Realoads recation roles', // Required for slash commands

  slash: true,
  testOnly: true,

  permissions: ['ADMINISTRATOR'],

  callback: ({ message, interaction }) => {
    log(message+' ')

    if (message) {
      message.reply({
        content: "reply"
      })
      return
    }

    for (let i = 0; i < Object.keys(react_roles).length; i++) {
      log(react_roles[i].name + " " + react_roles[i].emoji)

      if (react_roles[i].id != "") { break; }
      // log(gg.name)
      // gg.roles.create({
      //     name: react_roles[i].name,
      //     color: react_roles[i].color,
      // })
      // .then(console.log)
      // .catch(console.error);
    }
  },
} as ICommand