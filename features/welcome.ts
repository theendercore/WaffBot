import { Client, TextChannel, } from 'discord.js'
import WOKCommands from 'wokcommands'

export default (client: Client, instance: WOKCommands) => {
    client.on('guildMemberAdd',async (member) => {
        console.log('[WafBot] ' + member + ' joined!')
        const { guild } = member

        const channel = guild.channels.cache.find(
            (channel) => channel.id === '969277045404229652'
        ) as TextChannel
        if (!channel) return

        const welcomeEmbed = {
            color: 0xdfa32c,
            title: `Hello ${member.displayName}!`,
            description: `Hope you have a fun time :)\nChek your DM's!`,
            thumbnail: {
                url: member.displayAvatarURL(),
            },
        };

        console.log('[WafBot]' + member.id);
        channel.send({ embeds: [welcomeEmbed] });

        member.send(`> **Welcome to ${guild}**\nTo get in give me ur Mine Craft acount`);

    })
}

const config = {
    displayName: 'Welcome Message',
    dbName: 'WELCOME-MSG'
}

export { config }
