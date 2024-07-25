import { NextFunction, Request, Response } from "express";
import { Card, Table, Transaction } from "./type";

const express = require("express");
const modules = require("./modules");
const bp = require("body-parser");

const port = 3000;
const app = express();

const jp = bp.json(); // Use for post requests

app.use((_, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
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

function get(table: Table) {
  app.get(`/${table}`, (_, res: Response) => {
    modules
      .select(table)
      .then((data: any) => res.status(200).send(data))
      .catch((err: any) => res.status(500).send(err));
  });
  app.get(`/${table}/:id`, (req: Request, res: Response) => {
    const id = req.params.id;
    modules
      .select(table, parseInt(id))
      .then((data: any) => res.status(200).send(data))
      .catch((err: any) => res.status(500).send(err));
  });
}

function deleteId(table: Table) {
  app.delete(`/${table}/:id`, (req: Request, res: Response) => {
    const id = req.params.id;
    modules
      .deleteIt(table, id)
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(500).send(err));
  });
}

function post(table: Table, func: (obj: Card | Transaction) => any) {
  app.post(`/${table}`, jp, (req: Request, res: Response) => {
    func(req.body)
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(500).send(err));
  });
}

get("cards");
get("transactions");
deleteId("cards");
deleteId("transactions");
post("transactions", modules.postTransaction);
post("cards", modules.postCard);

app.listen(port, () => console.log(`App listens on port ${port}`));
