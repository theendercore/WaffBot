import { ICommand } from 'wokcommands'

export default {
  category: 'Testing',
  description: 'Replies with cock', // Required for slash commands
  
  slash: true,
  testOnly: true,
  
  callback: ({}) => {
    const reply = 'Cock!'
    return reply
  },
} as ICommand