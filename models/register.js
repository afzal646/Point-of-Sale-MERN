const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const registerschema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: String,
    role: String,
    tokens: [{
        token: String
    }]
}, {
    timestamps: true,
})

registerschema.methods.generateJWTToken = function () {
    try {
        var generatedtoken = jwt.sign({ id: this._id }, "FULLSTACKWEBMEANMERN", { expiresIn: 3000000 });
        this.tokens = this.tokens.concat({ token: generatedtoken })
        this.save()
        return generatedtoken;
    } catch (err) {
        console.log(err)
        return "false"
    }
}

const Register = new mongoose.model("Register", registerschema);

module.exports = Register;
