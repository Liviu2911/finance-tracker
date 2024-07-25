"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var client = new pg_1.Pool({
    port: 5432,
    host: "localhost",
    user: "liviu",
    password: "liviu",
    database: "ft",
});
function select(table, id) {
    var query = id && id > 0 ? " WHERE id = ".concat(id) : "";
    try {
        return new Promise(function (res, rej) {
            client.query("SELECT * FROM ".concat(table, " ").concat(query), function (err, data) {
                if (err)
                    rej(err);
                if (data && data.rows)
                    res(data.rows);
                rej("Data not found");
            });
        });
    }
    catch (e) {
        throw new Error(e);
    }
}
function deleteIt(table, id) {
    try {
        return new Promise(function (res, rej) {
            client.query("DELETE FROM ".concat(table, " WHERE id = ").concat(id), function (err, data) {
                if (err)
                    rej(err);
                if (data && data.rows)
                    res(data.rows);
                rej("Data couldn't be deleted");
            });
        });
    }
    catch (e) {
        throw new Error(e);
    }
}
function postCard(card) {
    var owner = card.owner, nickname = card.nickname, color = card.color;
    try {
        return new Promise(function (res, rej) {
            client.query("INSERT INTO cards (owner, nickname, color) VALUES (".concat(owner, ", ").concat(nickname, ", ").concat(color, ")"), function (err) {
                if (err)
                    rej(err);
                res("Data inserted into cards");
            });
        });
    }
    catch (e) {
        throw new Error(e);
    }
}
function postTransaction(transaction) {
    var amount = transaction.amount, purpose = transaction.purpose, notes = transaction.notes, card = transaction.card, date = transaction.date;
    var note = notes ? " notes" : "";
    var query = notes ? ",".concat(notes) : "";
    try {
        return new Promise(function (res, rej) {
            client.query("INSERT INTO transactions (amount, purpose, card, date ".concat(note, ") VALUES (").concat(amount, ", ").concat(purpose, ",").concat(card, ",").concat(date, " ").concat(query, ")"), function (err, data) {
                if (err)
                    rej(err);
                res("Data inserted into transactions");
            });
        });
    }
    catch (e) {
        throw new Error(e);
    }
}
module.exports = { select: select, deleteIt: deleteIt, postCard: postCard, postTransaction: postTransaction };
