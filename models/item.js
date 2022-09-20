const mongoose = require("mongoose");


const itemschema = new mongoose.Schema({
    itemcode: {
        type: String
    },
    itemname: {
        type: String
    },
    costprice: Number,
    price: Number   
}, {
    timestamps: true,
})

const Item = new mongoose.model("Item", itemschema);

module.exports = Item;