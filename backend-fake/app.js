const express = require("express");
const { get } = require("http");
const app = express();

const port = 9000;

app.get("/", (req, res) => {
  res.status(200).send("deu certo!");
});

/**  objPlayer {
 *    id;
 *    chips;
 *    cards [];
 *    position;
 * } */
// positionTable{
//
// }
// deckDealer

app.get("/deck-dealer", (req, res) => {
  res.status(200).send("deck dealer!!!");
});

app.get("position-table", (req, res) => {
  res.status(200).send("position-table");
});

app.get("/player", (req, res) => {
  res.status(200).send("object player");
});

app.listen(port, () => {
  console.log(`linten in port = ${port}`);
});
