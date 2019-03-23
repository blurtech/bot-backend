const repository = require('../repositories/messages');

exports.greetings = async (req, res) => {
    const data = await repository.greetings()
    return res.success(data)
};

exports.sendMessage = (req, res) => {
    res.success({message: req.body.message + ' no, fuck you'});
}