import { Client, TextChannel } from 'discord.js'
import WOKCommands from 'wokcommands'

const welcomeData = {}

export default (client: Client, instance: WOKCommands) => {

  client.on('guildMemberAdd', (member) => {
    const { guild } = member

    // Get the channel named "welcome"
    const channel = guild.channels.cache.find(
      (channel) => channel.id === '969271222170976266'
    ) as TextChannel

    // Ensure this channel exists
    if (!channel) {
        console.log("no channel help")
      return
    }

    channel.send({
      content: `Welcome ${member} to the server!`,
    })
  })
}
//     client.on('guildMemberAdd', async member => {
//         const { guild, id } = member

//         let data = welcomeData[guild.id]

//         if(!data) {
//             const results = await welcomeSchema.findById(guild.id)
//             if(!results) {
//                 return
//             }
//             const { channelId, text } = results
//             const channel = guild.channels.cache.get(channelId)
//             data = welcomeData[guild.id] = [channel, text]
//         }

//         data[0].send({
//             content: data[1].replace(/@/g, `<@${id}>`),
//         })


//         docCount = await verifySchema.countDocuments({
//             discordId: member.id,
//             verified: ("true")
//         })


//         if (docCount > 0) {
            
//         userDoc = await verifySchema.findOne({
//             discordId: member.id,
//             verified: ("true")
//         })

//         mcUserName = userDoc.get("mcUserName")
//         memberStatus = userDoc.get("memberStatus")

        
//             let roleName = 'WBVerified';
//             let role = guild.roles.cache.find(x => x.name === roleName);
//             if (!role) {
//                 guild.roles.create({
//                     name: 'WBVerified',
//                     color: 65280,
//                     reason: 'A role to verify users!',
//                   })
//                     .catch(console.error);
//             }  
            
//             let verifyRole = guild.roles.cache.find(x => x.name === roleName)

//                 let verifee = member
//                 verifee.setNickname(mcUserName)
//                 verifee.roles.add(verifyRole)

//                 const consoleChannel = guild.channels.cache.find(channel => channel.name === "super-secret-console")

//                 consoleChannel.send(`whitelist add ${mcUserName}`)

//                 if (memberStatus) {
//                     let memberRole = verifee.guild.roles.cache.find(role => role.name === 'Server member')
//                     let pingRole = verifee.guild.roles.cache.find(role => role.name === 'Can Ping')
//                     if (memberRole) {
//                          await verifee.roles.add(memberRole);
//                     }
//                      if (pingRole) {
//                         await verifee.roles.add(pingRole);
//                     }
//                 }
//     }
//     })
// }

// //module.exports (config) = {
// //    displayName: 'Welcome Channel',
// //   dbName: 'WELCOME_CHANNEL'
// //}