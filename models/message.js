let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let messagesSchema = new Schema({
    user: String,
    time: Date,
    message: String
});

module.exports = mongoose.model('message', messagesSchema);