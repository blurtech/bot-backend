const repository = require('../repositories/messages');
const fuzz = require('fuzzball');

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
    questions = questions.reduce(function(flat, current) {
        return flat.concat(current);
    }, []);
    questions.forEach(async function (element) {
        if (fuzz.token_sort_ratio(element, req.body.message) > 70)
            return res.success(await repository.getAnswer(element));
    });
    const options = {
    	limit: 1,
    	cutoff: 50,
    	unsorted: true
    };
    req.body.message.split(' ').map(word => fuzz.extract(word, questions, options))
};