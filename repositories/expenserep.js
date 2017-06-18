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

    get(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT rowid AS id, amount, description FROM expenses WHERE rowid=?', [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row); 
                }
            });
        });
    }

    delete(id) {
        let stmt = db.prepare('DELETE FROM expenses WHERE rowid=?');
        stmt.run(id);
        return stmt.finalize();
    }

    update(id, amount, description) {
        let stmt = db.prepare('UPDATE expenses SET amount=?, description=? WHERE rowid=?');
        stmt.run(amount, description, id);
        return stmt.finalize();
    }
};

module.exports = expenserep;