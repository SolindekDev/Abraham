const Command = require("../../Structures/command")

const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

module.exports = new Command({
    name: "links",
    description: "Shows important links for bot!",
    category: "Bot",
    run: async (client, message, args) => {
        let ping = new MessageEmbed()

        .setColor('#2f3136')
        .setTitle(`Important links!`)
        .setDescription(`> [Invite me!](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)
        > [Support server](https://discord.gg/nh7UXhCPWH)
        > [Website](https://abraham.gq/)
        > [Dashboard](https://abraham.gq/dashboard)`)
        .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 }))

        message.channel.send({embeds: [ping]});
    }
})