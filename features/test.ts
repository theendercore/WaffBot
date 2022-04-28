import { Client, Message, TextChannel } from 'discord.js'
import WOKCommands from 'wokcommands'

export default (client: Client, instance: WOKCommands) => {
  client.on('guildMemberAvailable', (member) =>{
      console.log('[WafBot] '+ member.nickname)
  })
}

const config = {
    displayName: 'test',
    dbName: 'TEST'
  }
  
  export { config }
  