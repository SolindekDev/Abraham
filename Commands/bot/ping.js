const Command = require("../../Structures/command")

const { MessageEmbed } = require("discord.js")

module.exports = new Command({
    name: "ping",
    description: "Shows latency of bot!",
    category: "Bot",
    run: async (client, message, args) => {
        message.channel.send("🏓").then((m) => {
            setTimeout(() => {
                
                let ping = new MessageEmbed()

                .setColor('#2f3136')
                .setTitle(`Look at my ping  🏓`)
                .setDescription(`Bot latency\n\`\`\`${Date.now() - message.createdTimestamp}ms\`\`\`\nDiscord latency\n\`\`\`${Math.round(client.ws.ping)}ms\`\`\``)
                .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 }))
        
                m.edit({embeds: [ping], content: " "});
            }, 1000);
        })
    }
})