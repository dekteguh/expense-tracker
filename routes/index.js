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

router.get('/edit/:id', (req, res, next) => {
  // Baca database
  let repository = new ExpenseRep();
  let expenses = repository.get(req.params.id) // jika hanya ini aja, maka hasilnya ada <pending>
    .then((row) => { // then untuk berhasil
      console.log(row);
      res.render('update', {
        title: 'Expense Tracker',
        expense: row
      });
    })
    .catch((err) => console.log(err)); // catch untuk gagal
});

router.post('/update', (req, res) => {
  let id = req.body.id;
  let amount = parseInt(req.body.amount);
  let description = req.body.description;

  // Simpan ke dalam database
  let repository = new ExpenseRep();
  repository.update(id,amount,description);

  // Redirect
  res.redirect('/');
});

router.get('/delete/:id', (req, res, next) => {
  // Baca database
  let repository = new ExpenseRep();
  repository.delete(req.params.id); // jika hanya ini aja, maka hasilnya ada <pending>
  res.redirect('/');
});

module.exports = router;
