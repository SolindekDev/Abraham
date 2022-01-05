const Event = require('../Structures/event')

module.exports = new Event({
    name: 'ready',
    run: async () => {
        console.log("✅ Bot is ready!");
    }
})