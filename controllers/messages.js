const repository = require('../repositories/messages');
const fuzz = require('fuzzball');

const flat = (input) => {
	return input.reduce((acc, current) => {
		return acc.concat(current);
	}, []);
}

exports.greetings = async (req, res) => {
    const data = await repository.greetings();
    return res.success(data)
};

exports.sendMessage = async (req, res) => {
    let questions = [];
    const data = await repository.getKeywords();
    for (let prop in data) {
        questions.push(data[prop].question);
    }
    questions = flat(questions);
    const options = {
    	limit: 1,
    	cutoff: 70,
    	unsorted: true
    };
    questions = req.body.message.split(' ').map(word => fuzz.extract(word, questions, options));
    questions = flat(questions).reduce((acc, current) => {
    	acc.push(current[0]);
    	return acc;
    }, []);
    const answer = questions.length
        ? await repository.getAnswer(questions[0])
        : (repository.saveQuestion(req.body.message), { message: 'Я не понимаю чего вы от меня хотите, можете перефразировать?' });
    return res.success(answer)
};