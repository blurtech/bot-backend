const repository = require('../repositories/messages');

exports.greetings = (req, res) => {
    res.success({message: repository.greetings()});
}

exports.sendMessage = (req, res) => {
    res.success({message: req.body.message + ' no, fuck you'});
}