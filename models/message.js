let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let messageSchema = new Schema({
    user: String,
    time: Date,
    message: String
});

module.exports = mongoose.model('messages', messageSchema);