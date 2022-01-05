const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    id: { type: String, unique: true, required: true },
    username: { type: String, required: true },
    bot: { type: Boolean, required: true },
    discriminator: { type: String, required: true },
    avatar: { type: String, required: true, unique: true },
}) 

const userModel = mongoose.model('users', userSchema);

module.exports = userModel