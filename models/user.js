let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let messageSchema = new Schema({
    user: String,
    messages: Array
});

module.exports = mongoose.model('users', messageSchema);