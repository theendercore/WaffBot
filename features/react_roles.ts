import { Client, Message, TextChannel } from 'discord.js'
import WOKCommands from 'wokcommands'
import log from '../common/log'

export default (client: Client, instance: WOKCommands) => {
  client.on('messageReactionAdd', (mesage) =>{
    // log(mesage.emoji+' ')
      // console.log('[WafBot] '+ member.nickname)
  })
}

const config = {
    displayName: 'test',
    dbName: 'TEST'
  }
  
  export { config }
  