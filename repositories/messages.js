const User = require('../models/user');
const Answers = require('../models/answer');

exports.greetings = () => Answers.findOne( {'special': 'greetings'}, {'message': 1, '_id': 0} );

exports.getKeywords = () => Answers.find().distinct( 'question', function (err, result) {
	if (err) return handleError(err);

	assert(Array.isArray(result));
});

exports.getAnswer = (keyword) => Answers.findOne( {'answers': keyword} );