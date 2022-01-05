const mongoose = require('mongoose')
const Schema = mongoose.Schema

const guildSchema = new Schema({
    id: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    icon: { type: String, required: true },
    description: { type: String, required: false },
    owner_id: { type: String, required: true },
    prefix: { type: String, required: true, default: 'a!' },
}) 

const guildModel = mongoose.model('guilds', guildSchema);

module.exports = guildModel