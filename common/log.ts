import { Client, Guild, Message, TextChannel } from 'discord.js'

const logChannel = '973197471515811880';


export default function log(s: string) {
    console.log('[WafBot] ' + s);
}

export function logCantDel() {
    console.log('[WafBot] Could not delete the message');
}

// export function logDiscord(s: string, m: object) {
//     let channel = m.guild.channels.cache.get(logChannel)
//     console.log('[WafBot] ' + s);
// }