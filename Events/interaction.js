const Event = require("../Structures/event")

const { MessageEmbed } = require("discord.js")

module.exports = new Event({ 
    name: "interactionCreate",
    run: async (interaction) => {
        console.log(interaction)
        if (!interaction.isSelectMenu()) return;
    
        if (interaction.customId === 'help') {
            var commands = []

            switch (interaction.values[0]) {
                case 'Ticket':
                    interaction.client.commands.forEach(command => {
                        if (command.category == 'Ticket') {
                            commands.push(command)
                        }
                    })

                    if (commands.length == 0) {
                        interaction.ephemeral = true
                        const lengthZeroEmbed = new MessageEmbed()
                        .setFooter(`${interaction.member.tag} (${interaction.member.id})`, interaction.member.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 }))
                        .setColor('#2f3136')
                        .setTitle(`Ticket category`)
                        .setDescription("Any command is in this category!");

                        await interaction.reply({embeds:[lengthZeroEmbed], ephemeral: true})

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

                        await interaction.reply({embeds:[lengthZeroEmbed], ephemeral: true})
                    }
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

                        await interaction.reply({embeds:[lengthZeroEmbed], ephemeral: true})

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

                        await interaction.reply({embeds:[lengthZeroEmbed], ephemeral: true})
                    }
            }
        }
    }
})