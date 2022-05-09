import { ICommand } from 'wokcommands'

export default {
  category: 'Testing',
  description: 'replys with hello', // Required for slash commands
  
  slash: true,
  testOnly: true,
  
  callback: ({}) => {
    const reply = 'Hello!'
    return reply
  },
} as ICommand