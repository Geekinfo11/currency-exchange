const express = require("express");
const path = require("path");
const exchange = require("./utils/exchange");

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsDirectoryPath = path.join(__dirname, "../views");

app.use(express.static(publicDirectoryPath));

app.set("view engine", "hbs");
//app.set("vies")

app.get("", (req, res) => {
  res.render("index", {
    title: "Currency Exchange",
  });
});

app.get("/exchange", (req, res) => {
  if (req.query.from && req.query.to) {
    exchange(req.query.from, req.query.to, (errorMsg, data) => {
      if (errorMsg) {
        res.send(errorMsg);
      }
      res.send(data);
    });
  } else {
    res.send("invalid request. example: /exchange?from=usd&to=eur");
  }
});

app.get("*", (req, res) => {
  res.render("404page", {
    title: "404",
    errorMsg: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});
