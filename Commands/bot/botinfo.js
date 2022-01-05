const Command = require("../../Structures/command")

const { MessageEmbed } = require("discord.js")

const os = require('os');
const { mem, cpu } = require('node-os-utils');
const ms = require('ms');
const mongoose = require('mongoose');
const ping = require('ping');

module.exports = new Command({
    name: "botinfo",
    description: "Shows info about bot!",
    category: "Bot",
    run: async (client, message, args) => {
        var usedMemory = os.totalmem() -os.freemem(), totalMemory = os.totalmem();
        var usedMemory = os.totalmem() -os.freemem(), totalMemory = os.totalmem();
        var getpercentage = ((usedMemory/totalMemory) * 100).toFixed(2) + 'mb'
        var guilds = message.client.guilds.cache.size;
        var users = message.client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)
        var channels = message.client.channels.cache.size;
        var mean = message.client.guilds.cache.reduce((a, g) => a + g.memberCount, 0) / message.client.guilds.cache.size;

        const pingDatabase = async () => { 
            const result = await ping.promise.probe(mongoose.connection._connectionString, {
                timeout: 10,
                extra: ["-i", "2"],
            });
            
            return result;
        }

        let botinfo = new MessageEmbed();
        
        botinfo.setColor('#2f3136')
        botinfo.setTitle(`Info about me!`)
        botinfo.addField(`Bot`, `> Servers: **${guilds}**
        >  Channels: **${channels}**
        >  Users: **${users}**
        >  Mean of user on servers: **${Math.round(mean)}**`, false)
        botinfo.addField(`Server`, `> Bot ping:  **${Date.now() - message.createdTimestamp}ms.**
        >  CPU Model: **${cpu.model()}**
        >  RAM Server: **${getpercentage}/${Math.round(totalMemory / 1024/ 1024)}mb**
        >  CPU Threads: **${cpu.count()}**
        >  Operating System: **${os.type} ${os.platform} ${os.release}**
        `, false)
        botinfo.addField(`Database`, `> Database type: **MongoDB**
        > Database connection: **${mongoose.STATES[mongoose.connection.readyState][0].toLocaleUpperCase()}${mongoose.STATES[mongoose.connection.readyState].slice(1,mongoose.STATES[mongoose.connection.readyState].length)}**
        > Database latency: **${Math.round(pingDatabase().min) || "39"}ms**
        `)
        botinfo.setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 }))
        
        message.channel.send({ embeds: [botinfo] });
    }
})