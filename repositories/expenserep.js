const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');

const expenserep = class ExpenseRep {
    insert(expense) {
        let stmt = db.prepare('INSERT INTO expenses VALUES (?,?)');
        stmt.run(expense.amount, expense.description);
        return stmt.finalize();
    }

    read() {
        return new Promise((resolve, reject) => {
            db.all('SELECT rowid AS id, amount, description FROM expenses', (err, row) => {
                if (err) {
                    reject(err); // jika gagal
                } else {
                    resolve(row); // jika berhasil
                }
            });
        });
    }
};

module.exports = expenserep;