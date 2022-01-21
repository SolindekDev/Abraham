const Event = require("../Structures/event")

const { MessageEmbed, MessageSelectMenu, MessageActionRow } = require("discord.js")

module.exports = new Event({ 
    name: "interactionCreate",
    run: async (interaction) => {
        console.log(interaction)
        if (!interaction.isSelectMenu()) return;
    
        if (interaction.customId === 'help') {
            var commands = []

            var select = new MessageSelectMenu()
                .setCustomId('help')
                .setPlaceholder('Nothing selected')
                .addOptions([
                    {
                        label: "Moderation",
                        description: "This will show you the moderation category commands",
                        emoji: "🌌",
                        value: "Moderation"
                    },
                    {
                        label: "Bot",
                        description: "This will show you the bot category commands",
                        emoji: "🤖",
                        value: "Bot"
                    },
                    {
                        label: "Ticket",
                        description: "This will show you the ticket category commands",
                        emoji: "📧",
                        value: "Ticket"
                    },
                    {
                        label: "4Fun",
                        description: "This will show you the 4fun category commands",
                        emoji: "🎉",
                        value: "4Fun"
                    },
                    {
                        label: "Useful",
                        description: "This will show you the useful category commands",
                        emoji: "🔥",
                        value: "Useful"
                    },
                    {
                        label: "Music",
                        description: "This will show you the music category commands",
                        emoji: "🎵",
                        value: "Music"
                    },
                ])

            var row = new MessageActionRow()
                .addComponents(select);

            switch (interaction.values[0]) {
                case 'Ticket':
                    interaction.client.commands.forEach(command => {
                        if (command.category == 'Ticket') {
                            commands.push(command)
                        }
                    })

                    if (commands.length == 0) {
                        const lengthZeroEmbed = new MessageEmbed()
                            .setFooter(`${interaction.member.tag} (${interaction.member.id})`, interaction.member.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 }))
                            .setColor('#2f3136')
                            .setTitle(`Ticket category`)
                            .setDescription("Any command is in this category!");

                        await interaction.message.edit({embeds: [lengthZeroEmbed], components: [row]})

                    } else {
                        const lengthZeroEmbed = new MessageEmbed()
                        .setFooter(`${interaction.member.tag} (${interaction.member.id})`, interaction.member.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 }))
                        .setColor('#2f3136')
                        .setTitle(`Ticket category`)
                        var desc = ""

                        commands.forEach(command => {
                            desc += `**${command.name}** - ${command.description}\n`
                        })

                        lengthZeroEmbed.setDescription(desc)

                        await interaction.message.edit({embeds: [lengthZeroEmbed], components: [row]})
                    }
                    break;
                case 'Bot':
                    interaction.client.commands.forEach(command => {
                        if (command.category == 'Bot') {
                            commands.push(command)
                        }
                    })

                    if (commands.length == 0) {
                        interaction.ephemeral = true
                        const lengthZeroEmbed = new MessageEmbed()
                        .setFooter(`${interaction.member.tag} (${interaction.member.id})`, interaction.member.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 }))
                        .setColor('#2f3136')
                        .setTitle(`Bot category`)
                        .setDescription("Any command is in this category!");

                        await interaction.message.edit({embeds: [lengthZeroEmbed], components: [row]})

                    } else {
                        const lengthZeroEmbed = new MessageEmbed()
                        .setFooter(`${interaction.member.tag} (${interaction.member.id})`, interaction.member.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 }))
                        .setColor('#2f3136')
                        .setTitle(`Bot category`)
                        var desc = ""

                        commands.forEach(command => {
                            desc += `**${command.name}** - ${command.description}\n`
                        })

                        lengthZeroEmbed.setDescription(desc)

                        await interaction.message.edit({embeds: [lengthZeroEmbed], components: [row]})
                    }
                    break;
            }
        }
    }
})