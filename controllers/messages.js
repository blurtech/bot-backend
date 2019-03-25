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

exports.sendMessageLong = async (req, res) => { //Функиця поиска ответа с использованием формулы
    let questions = [];
    const data = await repository.getKeywords();
    for (let prop in data) {
        questions.push(data[prop].question);
    }
    questions = flat(questions);

    let sizeReq = req.body.message.length;
    let max = 0;

    console.log(sizeReq);

    questions.forEach(function (item, i, arr) {
        if (item.length < sizeReq) {
            let x = (item.length / sizeReq) * 70 * 2;
            let score = fuzz.token_sort_ratio(req.body.message, item);
            console.log(x + ' ' + item + ' ' + score);
            if (x < 70) {
                if (score < x) {
                    questions = questions.filter(question => question !== item);
                } else if (max < score) max = score;
            } else {
                if (score < 70) {
                    questions = questions.filter(question => question !== item);
                } else if (max < score) max = score;
            }
        }
    });

    questions.forEach((item) => {
        let score = fuzz.token_sort_ratio(req.body.message, item);
        if (score === max) console.log(item);
    });

    console.log(questions);
    console.log(max);

    questions = flat(questions).reduce((acc, current) => {
        acc.push(current[0]);
        return acc;
    }, []);
    const answer = await repository.getAnswer(questions[0]);
    //return res.success(answer)
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
    let answer;
    if (questions.length) {
        answer = await repository.getAnswer(questions[0]);
        if (answer.type === 'text')
            switch (answer.special) {
                case 'time': {
                    let date = new Date();

                    let hours = date.getHours();
                    let minutes = "0" + date.getMinutes();

                    answer.message = answer.message + hours + ':' + minutes.substr(-2);
                    break;
                }

            }
        else {
            switch (answer.type) {
                case 'document': {
                    answer.message = answer.message + '\n' + answer.link;
                    break;
                }
            }
        }
    } else {
        answer = repository.saveQuestion(req.body.message), {message: 'Я не понимаю чего вы от меня хотите, можете перефразировать?'};
    }
    return res.success({message: answer.message})
};
