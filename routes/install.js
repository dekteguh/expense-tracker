const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    let db = new sqlite3.Database('data.db');
    db.serialize(function () {
        db.run('CREATE TABLE expenses (amount INTEGER, description TEXT)'); 
    });

    db.close();

    res.send('db has been initialized');
});

module.exports = router;