const repository = require('../repositories/messages');
let fuzz = require('fuzzball');

exports.greetings = async (req, res) => {
    const data = await repository.greetings()
    return res.success(data)
};

exports.sendMessage = (req, res) => {
    res.success({message: repository.getAnswer('Пока') + ' no, fuck you'});
};