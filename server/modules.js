const { Pool } = require("pg");

const client = new Pool({
  host: "localhost",
  port: "5432",
  password: "liviu",
  database: "ft",
  user: "liviu",
});

function getTransactions(id) {
  const query = id > 0 ? ` WHERE id = ${id}` : "";
  try {
    return new Promise((res, rej) => {
      client.query("SELECT * FROM transactions" + query, (err, data) => {
        if (err) rej(err);
        if (data && data.rows) res(data.rows);
        rej("Data couldn't be fetched");
      });
    });
  } catch (e) {
    throw new Error(e);
  }
}

const getCards = (id) => {
  const query = id > 0 ? ` WHERE id = ${id}` : "";
  try {
    return new Promise((res, rej) => {
      client.query("SELECT * FROM cards" + query, (err, data) => {
        if (err) rej(err);
        if (data && data.rows) res(data.rows);
        rej("Data not found");
      });
    });
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = { getTransactions, getCards };
