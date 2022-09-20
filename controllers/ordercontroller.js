const express = require("express");
const app = express();
const path = require("path");
var bodyParser = require("body-parser");
require("../db/conn");
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
const Order = require("../models/order");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
var cors = require("cors");
app.use(cors());

exports.addorder = async (req, res) => {
  try {
    //console.log("enter in 1");
    const addorder = new Order(req.body);
    //console.log("enter in 2" + req.body.itemcode);
    const itemadded = await addorder.save();
    res.send(itemadded);
    //console.log("enter in 3");
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.allorder = async (req, res) => {
    try {
      const filteredresult = await Order.find();
      res.send(filteredresult);
    } catch (error) {
      res.status(400).send(error);
    }
  };