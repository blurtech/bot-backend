const express = require('express');
const router = express.Router();
const messages = require('./messages');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.success({message: "Everything OK!"});
});

/**
 * Роутер для приёма и отправки сообщений
 *
 * @param {string} адрес роута
 * @param {function} функция в контроллере которая выполняет логику
 * @example router.use('/api/messages', messages)
 */
router.use('/api/messages', messages);

module.exports = router;
