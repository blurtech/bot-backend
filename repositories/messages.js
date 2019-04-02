const Answers = require('../models/answer');
const Question = require('../models/question');

/**
 * Получение массива всех ключевых слов
 * @returns {Array} массив массиво с ключевыми словами
 */
exports.getKeywords = () => Answers.find({}, {'question': 1, "_id": 0} );

/**
 * Получение сообщения по ключевому слову
 * @param {ObjectId} keyword - ключевое слово
 * @returns {json} текст сообщения
 */
exports.getAnswer = (keyword) => Answers.findOne( {'question': keyword});//, {'message': 1, '_id': 0, 'special': 1} );

/**
 * Получение сообщения по id
 * @param {ObjectId} id - _id документа в котором текст сообщения
 * @returns {json} - текст сообщения
 */
exports.getMessage = (id) => Answers.findById( id, {'message': 1, '_id': 0} );

/**
 * Сохранение непонятых ботом вопросов
 * @param {string} question - непонятый ботом вопрос
 */
exports.saveQuestion = (question) => Question.create({question: question});