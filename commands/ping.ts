import { ICommand } from 'wokcommands'

export default {
  category: 'Teting',
  description: 'replys', // Required for slash commands
  
  slash: true,
  testOnly: true,
  
  callback: ({}) => {
    const reply = 'Cock!'
    return reply
  },
} as ICommand