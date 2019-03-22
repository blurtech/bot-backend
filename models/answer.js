let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let answerSchema = new Schema({
    _id: ObjectId,
    special: String,
    question: Array,
    message: String
});

module.exports = mongoose.model('answers', answerSchema);