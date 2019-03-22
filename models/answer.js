let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let answerSchema = new Schema({
    _id: String,
    special: String,
    question: Array,
    answer: String
});

module.exports = mongoose.model('answers', answerSchema);