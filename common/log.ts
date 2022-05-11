import { Client, Guild, Message, TextChannel } from "discord.js";

const logChannel = "973197471515811880";

export default function log(s: string) {
  console.log("[WafBot] " + s);
}

export function logCantDel() {
  console.log("[WafBot] Could not delete the message");
}

export function sendDeleteMSG(message: Message<boolean>, channel: TextChannel, text: string) {
  channel.send(text).then((sentMessage) => {
    setTimeout(() => sentMessage.delete().catch(() => logCantDel()), 1000);
    setTimeout(() => message.delete().catch(() => logCantDel()), 1000);
    return;
  });
}

export function sendDeleteReply(message: Message<boolean>, channel: TextChannel, text: string) {
  channel.send(text).then((sentMessage) => {
    setTimeout(() => sentMessage.delete().catch(() => logCantDel()), 1000);
    return;
  });
}
// export function logDiscord(s: string, m: object) {
//     let channel = m.guild.channels.cache.get(logChannel)
//     console.log('[WafBot] ' + s);
// }
