const functions = require("firebase-functions");
// import { https } from "firebase-functions";

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51MBYwxHaMIJrug0OmZIxzJ5q1b2ybvJD4QmtQNxQw2gIX8ZzAkFBBG2J7sSflohpRQexPfJr50nl2qCswUUHfDeH00mJPnZuKU"
);

const server = express();
// middle wares

server.use(cors({ origin: true }));
server.use(express.json());

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "yohannes",
  password: "yohannes",
  database: "gezhi",
});
mysqlConnection.connect((err) => {
  if (err) {
    console.log(`there is error in mysql Connector `);
  } else {
    console.log("Mysql and Node connected Successfully");
  }
});

server.get("/", (req, res) => {
  res.status(200);
  res.send("hello world");
});
server.post("/payments/create", async (req, res) => {
  const total = Math.round(req.query.total);
  // console.log("total amount to pay is " + total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });

  // console.log(res)
});
server.get("/mysql", (req, res) => {
  const table1 = `create table my1(id int)`;
  const table2 = `create table my2(id int)`;
  const table3 = `create table my3(id int)`;

  mysqlConnection.query(table1, (err, result, field) => {
    if (err) {
      console.log("err");
    }
    console.log("done");
  });
  mysqlConnection.query(table2, (err, result, field) => {
    if (err) {
      console.log("err");
    }
    console.log("done");
  });
  mysqlConnection.query(table3, (err, result, field) => {
    if (err) {
      console.log("err");
    }
    console.log("done");
  });
  res.status(200).send("mysql");
});

//
server.post("/confirmedOrders", (req, res) => {
  const allData = req.query.allData;
  const data = JSON.parse(allData);
  // console.log("-------------------------------------");
  // console.log("-------------------------------------");

  const Insert = ` INSERT INTO paymenthistory(user_id,user_email,payment_amount,payment_id,secret,payment_create) Value(
    '${data.uI}',
    '${data.uE}',
    '${Math.round(data.pA/100)}',
    '${data.pI}',
    '${data.pCS}',
    '${data.pC}');`

  mysqlConnection.query(Insert, (err, result, field) => {
    if (err) {
      console.log("------------ there is error in inserting order");
      console.log(err);
      return;
    }

    console.log("------------ Successful inserting order");
  });
  res.status(200).send("joya");
});
exports.api = functions.https.onRequest(server);

// http://127.0.0.1:5001/clone-44b3b/us-central1/api
