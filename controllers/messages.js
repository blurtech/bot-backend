const repository = require('../repositories/messages');
const fuzz = require('fuzzball');


console.log(fuzz.token_set_ratio('Есть кейс цифрового атома?', 'есть кейс?'));
console.log(fuzz.token_set_ratio('Есть цифрового атома кейс?', 'есть кейс?'));
console.log(fuzz.token_set_ratio('Есть цифрового атома кейс?', 'цифровой атом'));


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


exports.greetings = async (req, res) => {
    const data = await repository.greetings();
    return res.success(data);
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


function checkWords(words, keyWords) {
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
            // res.push({result: tmpRes, answer: keywordItem});
            // console.log(fuzz.extract(questionItem, words, options));
            // console.log(tmpRes);
        }
    });
    // console.log(res);
    // res.forEach(item => console.log(item));

    let map = new Map();

    res.forEach(item =>{
        if (!map.has(item.answer.special)) map.set(item.answer.special, 0);
        map.set(item.answer.special, item.result[0].score + map.get(item.answer.special));
    });

    // map.forEach(async (value, key, map) => {
    //     let answer = await repository.getAnswerBySpecial(key);
    //     let n = answer.question.length
    //     map.set(key, value * (1/ n));
    //     console.log(map);
    // });

    console.log(map);

    let max = 0;
    let maxKey;

    map.forEach( (value, key, map) => {
        if (value > max) {
            max = value;
            maxKey = key;
        }
    });

    return map.size !== 0 ? maxKey : null;

}

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

    let special = checkWords(req.body.message.split(' '), await repository.newGetKeywords());

    console.log(special);

    questions = flat(questions);

    const options = {
        limit: 1,
        cutoff: 70,
        unsorted: true
    };

    questions = req.body.message.split(' ').map(word => fuzz.extract(word, questions, options));
    console.log(questions);
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

                    answer.message = answer.message + hours + ':' + minutes.substr(-2);
                    break;
                }

            }
        else {
            switch (answer.type) {
                case 'document': {
                    answer.message = answer.message + '\n<a href=' + answer.link + ' target=\'_blank\'>' + answer.link + '</a>';
                    break;
                }
            }
        }
    } else {
        answer = repository.saveQuestion(req.body.message);
        answer.message = 'Я не понимаю чего вы от меня хотите, можете перефразировать?';
    }
    return res.success({message: answer.message});
};
