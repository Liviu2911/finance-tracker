import { Pool } from "pg";
import { Card, Table, Transaction } from "./type";

const client = new Pool({
  port: 5432,
  host: "localhost",
  user: "liviu",
  password: "liviu",
  database: "ft",
});

function select(table: Table, id?: number) {
  const query = id && id > 0 ? ` WHERE id = ${id}` : "";
  try {
    return new Promise((res, rej) => {
      client.query(`SELECT * FROM ${table} ${query}`, (err, data) => {
        if (err) rej(err);
        if (data && data.rows) res(data.rows);
        rej("Data not found");
      });
    });
  } catch (e) {
    throw new Error(e);
  }
}

function deleteIt(table: Table, id: number) {
  try {
    return new Promise((res, rej) => {
      client.query(`DELETE FROM ${table} WHERE id = ${id}`, (err, data) => {
        if (err) rej(err);
        if (data && data.rows) res(data.rows);
        rej("Data couldn't be deleted");
      });
    });
  } catch (e) {
    throw new Error(e);
  }
}

function postCard(card: Card) {
  const { owner, nickname, color } = card;
  try {
    return new Promise((res, rej) => {
      client.query(
        `INSERT INTO cards (owner, nickname, color) VALUES (${owner}, ${nickname}, ${color})`,
        (err) => {
          if (err) rej(err);
          res("Data inserted into cards");
        }
      );
    });
  } catch (e) {
    throw new Error(e);
  }
}

function postTransaction(transaction: Transaction) {
  const { amount, purpose, notes, card, date } = transaction;
  const note = notes ? ` notes` : "";
  const query = notes ? `,${notes}` : "";
  try {
    return new Promise((res, rej) => {
      client.query(
        `INSERT INTO transactions (amount, purpose, card, date ${note}) VALUES (${amount}, ${purpose},${card},${date} ${query})`,
        (err, data) => {
          if (err) rej(err);
          res("Data inserted into transactions");
        }
      );
    });
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = { select, deleteIt, postCard, postTransaction };
