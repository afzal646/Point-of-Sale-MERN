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
const Item = require("../models/item");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
var cors = require("cors");
app.use(cors());

exports.additem = async (req, res) => {
  try {
    console.log("enter in 1")
    const additem = new Item(req.body);
    console.log("enter in 2"+ req.body.itemcode)
    const filteredresult = await Item.findOne({ itemcode: req.body.itemcode });
    console.log("enter in 3")
    if (filteredresult) {
      res.send({
        status: "failed",
        message: "Itemcode Already exists it should b unique",
      });
    } else {
      const itemadded = await additem.save();
      res.send("item added");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.allitem = async (req, res) => {
  try {
    const filteredresult = await Item.find();
    res.send(filteredresult);
  } catch (error) {
    res.status(400).send(error);
  }
};

// exports.edititem = async (req, res) => {
//     try {
//         const filteredresult = await Item.find({ _id: req.query._id });
//         req.body.itemid = filteredresult[0]._id;
//         req.body.itemname = filteredresult[0].itemname;
//         req.body.price = filteredresult[0].price;
//         req.body.costprice = filteredresult[0].costprice;
//         res.send("Welcome to Edit user Page");
//     } catch (error) {
//         res.status(400).send(error);
//     }
// }

exports.updateitem = async (req, res) => {
  try {
    console.log(req.body.itemid)
    const result = await Item.findOneAndUpdate(
      { _id: req.body.itemid },
      {
        $set: {
          itemname: req.body.itemname,
          price: req.body.price,
          costprice: req.body.costprice,
        },
      }
    );
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteitem = async (req, res) => {
  try {
    console.log("new id is"+req.query._id);
    const result = await Item.findOneAndDelete({ _id: req.query._id });
    res.send("item deleted successfully");
  } catch (error) {
    res.status(400).send(error);
  }
};
