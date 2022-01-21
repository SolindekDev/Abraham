const Command = require("../../Structures/command")

const { MessageEmbed } = require("discord.js")

module.exports = new Command({
    name: "eval",
    description: "Evale given code",
    category: "Eval",
    run: async (client, message, args) => {
        const code = args.slice(0).join(" ");
        
        if (!code) return message.channel.send("Code is required!")
        if (!message.author.id == "644446151210172447" || !message.author.id == "710772337045143572" || !message.author.id == "709685885431578634") return message.channel.send("You not a bot owner")

        try {
            const evaled = eval(code)
            message.channel.send(`
\`\`\`json
>>> ${code}
    
${evaled}\`\`\`
            `)
        } catch (e) {
            message.channel.send(`
\`\`\`json
>>> ${code}
    
${e}\`\`\`
            `)
        }

    }
})