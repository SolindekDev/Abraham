const fs = require("fs");
const path = require("path")

module.exports = (client) => {
    fs.readdirSync('Commands').forEach(dir => {
        const commands = fs.readdirSync(`Commands/${dir}/`).filter(file => file.endsWith(".js"));
        for (let file of commands) {
            const command = require(`../Commands/${dir}/${file}`);
            if (command.name == null) return console.log(`❌ ${command.name} is null`)
            if (command.run == null) return console.log(`❌ In ${command.name} run function is null`)

            if (typeof(command.run) != 'function') return console.log(`❌ In ${command.name} run function is not function type!`)

            console.log(`✅ Command ${command.name} loaded`);
            client.commands.set(command.name, command);
        }
    });
}