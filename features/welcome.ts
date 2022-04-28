import { Client, TextChannel, MessageEmbed } from 'discord.js'
import WOKCommands from 'wokcommands'

export default (client: Client, instance: WOKCommands) => {
    client.on('guildMemberAdd', (member) => {
        console.log('[WafBot] '+member+' joined!')
        const { guild } = member

        const channel = guild.channels.cache.find(
            (channel) => channel.id === '969277045404229652'
        ) as TextChannel
        if (!channel) {
            return
        }

        const welcomeEmbed = {
            color: 0x1256ff,
            title: `Hello ${member.displayName}!`,
            description: 'Hope you have a fun time :)',
            thumbnail: {
                url: member.displayAvatarURL(),
            },
            timestamp: new Date(),
        };

        console.log('[WafBot]' + member.displayAvatarURL());
        channel.send({ embeds: [welcomeEmbed] });

    })
}

const config = {
    displayName: 'Welcome Message',
    dbName: 'WELCOME-MSG'
}

export { config }
