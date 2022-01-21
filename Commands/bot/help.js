// const { MessageEmbed, MessageSelectMenu, MessageActionRow, MessageMenuOption } = require("discord.js");

// module.exports = {
//     name: "help",
//     category: "Bot",
//     description: "Help of bot",
//     run: async (client, message, args) => {
//         if (args[0]) {
//             const command = client.commands.get(args[0])
//             if (!command) return message.reply("Command not found!")

//             let ping = new MessageEmbed()
            
//             .setColor('#2f3136')
//             .setTitle(`Informations about "${command.name}" command`)
//             .addField("Name of command", `\`\`\`${command.name}\`\`\``)
//             .addField("Category of command", `\`\`\`${command.category}\`\`\``)
//             .addField("Description of command", `\`\`\`${command.description}\`\`\``)
//             .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 }))
    
//             return message.channel.send({ embeds: [ping] });
//         } else {

//             const select = new MessageSelectMenu()
//                 .setCustomId('help')
//                 .setPlaceholder('Nothing selected')
//                 .addOptions([
//                     {
//                         label: "Moderation",
//                         description: "This will show you the moderation category commands",
//                         emoji: "🌌",
//                         value: "Moderation"
//                     },
//                     {
//                         label: "Bot",
//                         description: "This will show you the bot category commands",
//                         emoji: "🤖",
//                         value: "Bot"
//                     },
//                     {
//                         label: "Ticket",
//                         description: "This will show you the ticket category commands",
//                         emoji: "📧",
//                         value: "Ticket"
//                     },
//                     {
//                         label: "4Fun",
//                         description: "This will show you the 4fun category commands",
//                         emoji: "🎉",
//                         value: "4Fun"
//                     },
//                     {
//                         label: "Useful",
//                         description: "This will show you the useful category commands",
//                         emoji: "🔥",
//                         value: "Useful"
//                     },
//                     {
//                         label: "Music",
//                         description: "This will show you the music category commands",
//                         emoji: "🎵",
//                         value: "Music"
//                     },
//                 ])

//             const row = new MessageActionRow()
//                 .addComponents(select);

//             const embed = new MessageEmbed()
//                 .setDescription("Find the command category you are interested in")
//                 .setTitle("Help")
//                 .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 }))
//                 .setColor('#2f3136')

// 		    await message.channel.send({ embeds:[embed], components: [row] });
//         }
//     }
// }