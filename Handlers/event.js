const fs = require('fs');

const { Constants: { Events } } = require("discord.js")
const serverEvents = Object.values(Events)

module.exports = (client) => {
    const events = fs.readdirSync("Events").filter((file) => file.endsWith(".js"))

    events.forEach((event) => {
        const eventReq = require(`../Events/${event}`);

        if (eventReq.run == null) return console.log(`❌ In ${event} function run is null`)

        if (serverEvents.includes(eventReq.name)) {
            client.on(eventReq.name, eventReq.run)
            console.log(`✅ Event ${event} loaded`);
        } else 
            return console.log(`❌ In ${event} name is not event`)
    })
}