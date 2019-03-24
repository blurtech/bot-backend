let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let answerSchema = new Schema({
    question: String
});

module.exports = mongoose.model('questions', answerSchema);