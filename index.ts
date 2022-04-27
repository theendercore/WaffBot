import DiscordJS, { Intents, Message, Options } from 'discord.js'
import dotenv from "dotenv"
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on('ready', () => {
    console.log(`Logged in as `+client.user?.tag)

    const guildID = '968877307638997032'
    const guild = client.guilds.cache.get(guildID)
    let commands

    if (guild) {
        commands = guild.commands
    } else {
        commands = client.application?.commands
    }

    commands?.create({
        name: 'ping',
        description: 'replies with pong'
    })


    commands?.create({
        name: 'add',
        description: 'adds things :)',
        options: [
            {
            name: '1th',
            description: 'the first',
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
           },
           {
           name: '2th',
           description: 'the seconth',
           required: true,
           type: DiscordJS.Constants.ApplicationCommandOptionTypes.INTEGER
          }
        ]
    })
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()){
        return
    }

    const {commandName, options} = interaction

    if (commandName === 'ping'){
        interaction.reply({
            content: 'pong',
        })
    } else if (commandName === 'add'){
        const text = options.getString('1th')!
        const numb = options.getInteger('2th')!

        interaction.reply({
            content: `Lmao no this is multipay : ${text + numb}`
        })
    }
})


// client.on('messageCreate', (message) => {
//     if(message.content === 'ping') {
//         message.reply({
//             content:'pong',
//         })
//     }
// })


client.login(process.env.TOKEN)