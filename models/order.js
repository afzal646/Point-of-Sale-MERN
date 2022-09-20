const mongoose = require("mongoose");

const orderschema = new mongoose.Schema({
    cusName: {
        type: String
    },
    orderDetail: [{        
        itemname: String,
        price: Number,
        qty: Number,
        totalprice: Number
    }],
    totalitemsprice: Number   
}, {
    timestamps: true,
})

const Order = new mongoose.model("Order", orderschema);

module.exports = Order;