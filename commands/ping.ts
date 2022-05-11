import { ICommand } from 'wokcommands'
import { logCantDel } from '../common/log';

export default {
  category: 'Testing',
  description: 'replys with hello', // Required for slash commands
  
  slash: false,
  testOnly: true,
  
  callback: ({message, channel}) => {
    const reply = 'Hello!'
    if (true){
      channel.send("Working").then((sentMessage) => {
        setTimeout(() => sentMessage.delete().catch((err) => logCantDel()), 1000);
        setTimeout(() => message.delete().catch((err) => logCantDel()), 1000);
        return;
      });
      return;
    }
    return reply
  },
} as ICommand