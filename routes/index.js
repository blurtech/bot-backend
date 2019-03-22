const express = require('express');
const router = express.Router();
const messages = require('./messages');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.success({message: "Everything OK!"});
});

router.use('/api/v1/messages', messages);

module.exports = router;
