"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var modules = require("./modules");
var bp = require("body-parser");
var port = 3000;
var app = express();
var jp = bp.json(); // Use for post requests
app.use(function (_, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers");
    next();
});
function get(table) {
    app.get("/".concat(table), function (_, res) {
        modules
            .select(table)
            .then(function (data) { return res.status(200).send(data); })
            .catch(function (err) { return res.status(500).send(err); });
    });
    app.get("/".concat(table, "/:id"), function (req, res) {
        var id = req.params.id;
        modules
            .select(table, parseInt(id))
            .then(function (data) { return res.status(200).send(data); })
            .catch(function (err) { return res.status(500).send(err); });
    });
}
function deleteId(table) {
    app.delete("/".concat(table, "/:id"), function (req, res) {
        var id = req.params.id;
        modules
            .deleteIt(table, id)
            .then(function (data) { return res.status(200).send(data); })
            .catch(function (err) { return res.status(500).send(err); });
    });
}
function post(table, func) {
    app.post("/".concat(table), jp, function (req, res) {
        func(req.body)
            .then(function (data) { return res.status(200).send(data); })
            .catch(function (err) { return res.status(500).send(err); });
    });
}
get("cards");
get("transactions");
deleteId("cards");
deleteId("transactions");
post("transactions", modules.postTransaction);
post("cards", modules.postCard);
app.listen(port, function () { return console.log("App listens on port ".concat(port)); });
