import { Client, TextChannel, } from 'discord.js'
import WOKCommands from 'wokcommands'
import log from '../common/log'
import uuid from 'uuid'
import VerifyModel from '../models/VerifyModel'


let welcomeData = {}

export default (client: Client, instance: WOKCommands) => {
    client.on('guildMemberAdd',async (member) => {
        log(member.displayName + ' joined!')
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

        channel.send({ embeds: [welcomeEmbed] });
        member.send(`> **Welcome to ${guild}**\nTo get in give me ur Mincruft acount`);
        member.roles.add("974622107843559444")
        let dbMember = await VerifyModel.findById(member.id);
        if(dbMember == null){
            VerifyModel.create({_id:member.id,verifiedSerevrs:[{serverID:member.guild.id, verified:false}]})
            log("do code")
        }






        // var id = uuid.v4()

        // let verifyRole = guild.roles.cache.find(x => x.id === '973212540190486538')
    })
}

const config = {
    displayName: 'Welcome Message',
    dbName: 'WELCOME-MSG'
}

export { config }


