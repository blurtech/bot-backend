const repository = require('../repositories/messages');
const fuzz = require('fuzzball');

/**
 * Преобразование в одномерный массив
 * @param {Array} input - ключевое слово
 * @returns {Array} одномерный массив
 */
const flat = (input) => {
	return input.reduce((acc, current) => {
		return acc.concat(current);
	}, []);
}

exports.greetings = async (req, res) => {
    const data = await repository.greetings();
    return res.success(data)
};

/**
 * Приём и отправка сообщений
 * @description
 * 1. на вход подается сообщение пользователя, оно разделяется
 * по пробелам на массив слов
 * 2. каждое слово проверяется на сходимость с каждым ключевым словом,
 * у каждого ключевого есть свое сообщение, которое отдается, если в сообщении найдено слово
 * 3. создается массив найденных ключевых слов в сообщении
 * 4. если массив пустой, сообщение записывается на будущую обработку,
 * иначе отдается сообщение за каждое уникальное найденное ключевое слово
 * @param {json} req - текст запроса
 * @param {json} res - текст ответа
 * @returns {json} ответ
 *
 */
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
