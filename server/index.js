const express = require("express");
const modules = require("./modules");
const port = 3000;

const app = express();

app.get("/transactions", (req, res) => {
  modules
    .getTransactions()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

app.listen(port, () => console.log(`App listens on port ${port}`));
