// const Discord = require('discord.js');
// const Voice = require('@discordjs/voice');
// const ytdl = require('ytdl-core');
// const yt_sr = require('youtube-sr').default;
// const search = require('youtube-search')

// const Command = require("../../Structures/command")

// const { MessageEmbed } = require("discord.js")

// module.exports = new Command({
//     name: "queue",
//     description: "Queue of music",
//     category: "Music",
//     run: async (client, message, args) => {
//         if (client.queue.length == 0) return message.chanel.send("Queue is empty!");

//         var musics = ""

//         client.queue.forEach((d) => {
//             musics += d.songs[0].title + "\n"
//         })

//         message.channel.send(`\`\`\`Queue of musics\n\n${musics}\`\`\``)
//     }
// })