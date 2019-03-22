const repository = require('../repositories/messages');

exports.greetings = (req, res) => {
    return repository.greetings().then((data) => {
        return res.success(data);
    }).catch((err) => {
        return res.serverError(err);
    });
};

exports.sendMessage = (req, res) => {
    res.success({message: req.body.message + ' no, fuck you'});
}