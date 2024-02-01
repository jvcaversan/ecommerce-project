const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

mongoose
  .connect(
    "mongodb+srv://joaovitorcaversan:joaovitorcaversan@cluster0.aufpkqx.mongodb.net/"
  )
  .then(() => {
    console.log("TA ON PORRA");
  })
  .catch((err) => {
    console.log("ta errado ai doidao", err);
  });

app.listen(port, () => {
  console.log("SERVER TA LIGADO NA PORTA 8000");
});
