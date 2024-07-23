const { Pool } = require("pg");

const client = new Pool({
  host: "localhost",
  port: "5432",
  password: "liviu",
  database: "ft",
  user: "liviu",
});

function getTransactions() {
  try {
    return new Promise((res, rej) => {
      client.query("SELECT * FROM transactions", (err, data) => {
        if (err) rej(err);
        if (data && data.rows) res(data.rows);
        rej("Data couldn't be fetched");
      });
    });
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = { getTransactions };
