var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  // TODO: work with request(req) sent

  res.json({message: 'The ussd message has been received'});
});

module.exports = router;
