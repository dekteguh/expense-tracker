var express = require('express');
var router = express.Router();
const Expense = require('../entities/expense'); // import expense
const ExpenseRep = require('../repositories/expenserep'); // import expenserep

/* GET home page. */
router.get('/', function (req, res, next) {
  // Baca database
  let repository = new ExpenseRep();
  let expenses = repository.read() // jika hanya ini aja, maka hasilnya ada <pending>
    .then((rows) => { // then untuk berhasil
      res.render('index', {
        title: 'Expense Tracker',
        expenses: rows
      });
    })
    .catch((err) => console.log(err)); // catch untuk gagal
});

/* POST form expense */
router.post('/', function (req, res) {
  let amount = parseInt(req.body.amount);
  let description = req.body.description;

  // Buat objek expense
  let expense = new Expense(amount, description);

  // Simpan ke dalam database
  let repository = new ExpenseRep();
  repository.insert(expense);

  // Redirect
  res.redirect('/');
});

module.exports = router;
