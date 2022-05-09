import { Client, Message, TextChannel } from 'discord.js'
import WOKCommands from 'wokcommands'
import log from '../common/log'

export default (client: Client, instance: WOKCommands) => {
  client.on('messageReactionAdd', (reaction, user) => {
    log(reaction.emoji.name + ' ' + reaction.emoji.identifier+ ' '+ reaction.me)
    
    reaction.remove()
    

  })
}

const config = {
  displayName: 'test',
  dbName: 'TEST'
}

export { config }
