const Answers = require('../models/answer');
const Question = require('../models/question');

greetings = () => Answers.findOne( {'special': 'greetings'}, {'message': 1, '_id': 0} );

getKeywords = () => Answers.find({}, {'question': 1, "_id": 0} );

getAnswer = (keyword) => Answers.findOne( {'question': keyword}, {'message': 1, '_id': 0} );

getMessage = (id) => Answers.findById( id, {'message': 1, '_id': 0} );

saveQuestion = (question) => Question.create({question: question});

module.exports = {
    greetings,
    getKeywords,
    getAnswer,
    getMessage,
    saveQuestion
};