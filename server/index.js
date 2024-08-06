const express = require("express");
const modules = require("./modules");
const bp = require("body-parser");

const port = 3000;
const app = express();

const jp = bp.json(); // Use for post requests

app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

function get(table) {
  app.get(`/${table}`, (_, res) => {
    modules
      .select(table)
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(500).send(err));
  });
  app.get(`/${table}/:id`, (req, res) => {
    const id = req.params.id;
    modules
      .select(table, parseInt(id))
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(500).send(err));
  });
}

get("cards");
get("transactions");

app.post("/cards", jp, (req, res) => {
  modules
    .postCard(req.body.owner, req.body.name, req.body.balance)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.delete("/cards/:id", (req, res) => {
  const id = parseInt(req.params.id);
  modules
    .deleteIt("cards", id)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.put("/cards/:id", jp, (req, res) => {
  const { owner, nickname, balance, id } = req.body;
  modules
    .editCard(owner, nickname, id, Number(balance))
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.listen(port, () => console.log(`App listens on port ${port}`));
