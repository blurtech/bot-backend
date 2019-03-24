const repository = require('../repositories/messages');
let fuzz = require('fuzzball');

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
        if (fuzz.token_sort_ratio(element, req.body.keyword) > 70)
            return res.success(await repository.getAnswer(element));
    });
};