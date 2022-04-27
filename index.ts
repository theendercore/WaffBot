import DiscordJS, { Intents, Message, Options } from 'discord.js'
import WOKCmd from 'wokcommands'
import path from 'path'
import mongoose from 'mongoose'
import 'dotenv/config'

import testSchema from './test-schema'

const guildID = '968877307638997032'

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ]
})

client.on('ready', async () => {

    console.log(`Logged in as ` + client.user?.tag)

    await mongoose.connect(
        process.env.MONGO_URI || '',
        {
            keepAlive: true
        }
    )

    new WOKCmd(client, {
        commandsDir: path.join(__dirname, 'commands'),
        typeScript: true, 
        testServers: guildID,
        mongoUri: process.env.MONGO_URI
    })
})

client.login(process.env.TOKEN)