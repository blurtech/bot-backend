const Answers = require('../models/answer');
const Question = require('../models/question');

greetings = () => Answers.findOne( {'special': 'greetings'}, {'message': 1, '_id': 0} );

/**
 * Получение массива всех ключевых слов
 * @returns {Array} массив массиво с ключевыми словами
 */
getKeywords = () => Answers.find({}, {'question': 1, "_id": 0} );

/**
 * Получение сообщения по ключевому слову
 * @param {ObjectId} keyword - ключевое слово
 * @returns {json} текст сообщения
 */
getAnswer = (keyword) => Answers.findOne( {'question': keyword});//, {'message': 1, '_id': 0, 'special': 1} );

/**
 * Получение сообщения по id
 * @param {ObjectId} id - _id документа в котором текст сообщения
 * @returns {json} - текст сообщения
 */
getMessage = (id) => Answers.findById( id, {'message': 1, '_id': 0} );

/**
 * Сохранение непонятых ботом вопросов
 * @param {string} question - непонятый ботом вопрос
 */
saveQuestion = (question) => Question.create({question: question});

module.exports = {
    greetings,
    getKeywords,
    getAnswer,
    getMessage,
    saveQuestion
    };
