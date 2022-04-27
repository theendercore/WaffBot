import { ICommand } from 'wokcommands'

export default {
  category: 'Testing',
  description: 'Replies with pong', // Required for slash commands
  
  slash: true,
  testOnly: true,
  
  callback: ({}) => {
    const reply = 'Pong!'
    return reply
  },
} as ICommand