const repository = require('../repositories/messages');
let fuzz = require('fuzzball');

exports.greetings = async (req, res) => {
    const data = await repository.greetings()
    return res.success(data)
};

exports.sendMessage = async (req, res) => {
    const data = await repository.getAnswer( keyword: 'Пока')
    return res.success(data)
};