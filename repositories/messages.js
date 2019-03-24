const User = require('../models/user');
const Answers = require('../models/answer');

exports.greetings = () => Answers.findOne( {'special': 'greetings'}, {'message': 1, '_id': 0} );

exports.getKeywords = () => Answers.find({}, {'question': 1, "_id": 0} );

exports.getAnswer = (keyword) => Answers.findOne( {'question': keyword}, {'message': 1, '_id': 0} );

exports.getMessage = (id) => Answers.findById( id, {'message': 1, '_id': 0} )