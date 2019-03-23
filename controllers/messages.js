const repository = require('../repositories/messages');
let fuzz = require('fuzzball');

exports.greetings = async (req, res) => {
    const data = await repository.greetings()
    return res.success(data)
};

exports.sendMessage = (req, res) => {
	const answer = repository.getKeywords()
    res.success({message: answer + ' no, fuck you'});
};