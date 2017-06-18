var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Expense Tracker' });
});


router.post('/', function (req, res) {
  console.log(req);
  let amount = parseInt(req.body.amount);
  let description = req.body.description;
});

module.exports = router;
