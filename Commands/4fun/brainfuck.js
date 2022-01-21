const Command = require("../../Structures/command")

const { MessageEmbed } = require("discord.js")

// https://gist.github.com/roachhd/dce54bec8ba55fb17d3a

module.exports = new Command({
    name: "brainfuck",
    description: "Simple brainfuck interpreter",
    category: "4Fun",
    run: async (client, message, args) => {
        const value = args.join(" ")

        if (value == "") return message.channel.send("No code given!")

        var memory = [0]
        var memory_pointer = 0
        var msg = ""
        var err = 0

        value.split("").forEach((c) => {
            if (c == ">") {
                memory_pointer += 1
                memory[memory_pointer] = 0
            } else if (c == "<") {
                if (memory_pointer != 0) {
                    memory_pointer -= 1
                }
            } else if (c == "+") {
                memory[memory_pointer]++
            } else if (c == "-") {
                if (memory[memory_pointer] != 0) {
                    memory[memory_pointer] -= 1
                }
            } else if (c == ".") {
                msg += String.fromCharCode(memory[memory_pointer])
            } else {
                err = 1
                return message.channel.send(`\`Unexpected character ${c}\``)
            }
        })

        if (err==1) return 

        if (msg == "") return message.channel.send("`No output..`")
        message.channel.send(`\`Output: ${msg}\``)
    }
})