const { Pool } = require("pg");
const define = require("express");

const client = new Pool({
  port: 5432,
  host: "localhost",
  user: "liviu",
  password: "liviu",
  database: "ft",
});

function select(table, id) {
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

function deleteIt(table, id) {
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

function postCard(owner, nickname, balance) {
  try {
    return new Promise((res, rej) => {
      client.query(
        `INSERT INTO cards (owner, nickname, balance) 
        VALUES ('${owner}', '${nickname}', ${balance})`,
        (err) => {
          if (err) rej(err.message);
          res("Data inserted into cards");
        }
      );
    });
  } catch (e) {
    throw new Error(e);
  }
}

function editCard(owner, nickname, id, balance) {
  try {
    return new Promise((res, rej) => {
      client.query(
        `UPDATE cards SET owner = '${owner}', nickname = '${nickname}', balance = ${balance} WHERE id = ${id}`,
        (err) => {
          if (err) rej(err.message);
          res("Data updated");
        }
      );
    });
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = { select, deleteIt, postCard, editCard };
