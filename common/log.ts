import { Message, TextChannel } from "discord.js";

export default function log(s: any) {
  console.log("[WafBot] " + s);
}

export function logWarn(s: any) {
  console.warn("[WafBot] " + s);
}

export function logCantDel() {
  console.log("[WafBot] Could not delete the message");
}

export function sendDeleteMSG(message: Message<boolean>, channel: TextChannel, text: string) {
  channel.send(text).then((sentMessage) => {
    setTimeout(() => sentMessage.delete().catch(() => logCantDel()), 5000);
    setTimeout(() => message.delete().catch(() => logCantDel()), 5000);
    return;
  });
}

export function sendDeleteReply(message: Message<boolean>, channel: TextChannel, text: string) {
  channel.send(text).then((sentMessage) => {
    setTimeout(() => sentMessage.delete().catch(() => logCantDel()), 5000);
    return;
  });
}

//add dsicord logger