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
};

const checkWords = (words, keyWords) => {
    const options = {
        cutoff: 70,
        unsorted: false,
        returnObjects: true
    };
    let res = [];
    keyWords.forEach(keywordItem => {
        let tmpRes = [];
        keywordItem.question.forEach(
            questionItem => {
                let tmp = fuzz.extract(questionItem, words, options);
                if (tmp.length !== 0) tmpRes.push(tmp);
            });
        if (tmpRes.length !== 0) {
            tmpRes.forEach(item => res.push({result: item, answer: keywordItem}));
            tmpRes = [];
        }
    });

    let map = new Map();

    res.forEach(item =>{
        if (!map.has(item.answer.special)) map.set(item.answer.special, 0);
        map.set(item.answer.special, item.result[0].score + map.get(item.answer.special));
    });

    let max = 0;
    let maxKey;

    map.forEach( (value, key, map) => {
        if (value > max) {
            max = value;
            maxKey = key;
        }
    });

    return map.size !== 0 ? maxKey : null;

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

    let special = checkWords(req.body.message.split(' '), await repository.getKeywords());

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
    if (questions.length !== 0) {
        answer = await repository.getAnswerBySpecial(special);
        if (answer.type === 'text')
            switch (answer.special) {
                case 'time': {
                    let date = new Date();
                    let hours = date.getHours();
                    let minutes = "0" + date.getMinutes();

                    answer.message = answer.message + hours + ':' + minutes.substr(-2) + ' GMT';
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
        answer = repository.saveQuestion(req.body.message);
        answer.message = 'Я не понял вас, но очень быстро учусь. Попробуйте спросить меня иначе!';
    }
    return res.success({message: answer.message});
};
