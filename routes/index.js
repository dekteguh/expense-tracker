var express = require('express');
var router = express.Router();
const Expense = require('../entities/expense'); // import expense

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Expense Tracker' });
});

/* POST form expense */
router.post('/', function (req, res) {
  let amount = parseInt(req.body.amount);
  let description = req.body.description;
  
});

module.exports = router;
