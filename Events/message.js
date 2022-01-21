const Event = require('../Structures/event')

const userModel = require('../Database/models/userModel')
const guildModel = require('../Database/models/guildModel')

module.exports = new Event({
    name: 'messageCreate',
    run: async (message) => {
        if (message.author.bot) return;
        if (!message.guild) return;
            
        guildModel.findOneAndUpdate({
            id: message.author.id,
        },{                     
            id: message.guild.id,
            name: message.guild.name,
            icon: message.guild.icon,
            description: message.guild.description,
            owner_id: message.guild.ownerID, 
        })

        userModel.findOne({ id: message.author.id }, (user, err) => {
            if (err) return;
            if (user == null) {
                userModel.create({
                    id: message.author.id,
                    username: message.author.username,
                    bot: message.author.bot,
                    discriminator: message.author.discriminator,
                    avatar: message.author.avatar,
                }, (err, user) => {
                    return message.reply("```Your account has been added into our database, if you want to delete it write into support server!```");
                })
            }
        })

        userModel.findOneAndUpdate({
            id: message.author.id,
        },{                     
            id: message.author.id,
            username: message.author.username,
            bot: message.author.bot,
            discriminator: message.author.discriminator,
            avatar: message.author.avatar,
        })

        guildModel.findOne({ id: message.guild.id }, (err, guild) => {
            if (err) return console.log(err);
            if (guild == null) {
                guildModel.create({
                    id: message.guild.id,
                    name: message.guild.name,
                    icon: message.guild.icon,
                    description: message.guild.description,
                    owner_id: message.guild.ownerID,
                })
            }
            console.log(guild)
            if (!message.content.startsWith(guild.prefix || 'a!') || message.author.bot) return;

            const args = message.content.slice(guild.prefix.length || 'a!'.length).split(/ +/);
            const commandName = args.shift().toLowerCase();

            const command = message.client.commands.get(commandName)

            if (!command) return;

            try {
                command.run(message.client, message, args);
            }
            catch (e) {
                message.channel.send('Error!')
            }
        })
    }
})