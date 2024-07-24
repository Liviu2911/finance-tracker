const express = require("express");
const modules = require("./modules");
const port = 3000;

const app = express();

function getIt(func, url) {
  app.get(`${url}`, (req, res) => {
    const id = req.params.id || "-1";
    func(id)
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(500).send(err));
  });
}

getIt(modules.getCards, "/cards");
getIt(modules.getCards, "/cards/:id");
getIt(modules.getTransactions, "/transactions");
getIt(modules.getTransactions, "/transactions/:id");

app.listen(port, () => console.log(`App listens on port ${port}`));
