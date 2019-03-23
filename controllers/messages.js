const repository = require('../repositories/messages');
let fuzz = require('fuzzball');

exports.greetings = async (req, res) => {
    const data = await repository.greetings();
    return res.success(data)
};

exports.sendMessage = async (req, res) => {
    const data = await repository.getAnswer(req.body.keyword);
    let question = data.question;
    question.forEach(async function (element) {
        if (fuzz.token_sort_ratio(element, req.body.keyword) > 70)
            return res.success(await repository.getMessage(data._id));
    });
};