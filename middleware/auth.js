const express = require("express");
const router = express.Router();
var cookieParser = require('cookie-parser');
router.use(cookieParser());
var jwt = require('jsonwebtoken');
const Register = require("../models/register");

exports.auth = async (req, res, next) => {
    try {
        console.log("token")
        const tokenn = req.cookies.node1; 
        console.log(tokenn)       
        if (tokenn) {
            const verifytokenn = jwt.verify(tokenn, "FULLSTACKWEBMEANMERN", async (err, decodedToken) => {
                if (err) {
                    console.log(err, message);
                    res.send("Welcome to Login Page");
                } else {
                    //console.log(decodedToken)
                    req.user = await Register.findOne({ _id: decodedToken.id });
                    // Inject the current user data into the view.
                    //console.log("user email is: " + req.user.email);
                    res.locals.currentUser = req.user;
                    //req.currentUser = user;
                    req.myuser = decodedToken.id;
                    next();
                }
            });

        }
        else {
            res.locals.currentUser = null;
            res.send("Welcome to Login Page");
        }

    } catch (error) {
        res.status(401).send(error);
    }
}


exports.isAdmin = async (req, res, next) => {
    try{
        if (req.user.role != "user") {
            console.log("in admin");
            return next(res.send("Access Denied, you must b admin", 401))
        }
        next()
    }catch (error) {
        res.status(401).send(error);
    }
}

exports.isUser = async (req, res, next) => {
    try{
        if (req.user.role == "admin") {
            console.log("in user");
            return next(res.send("Access Denied, you must b user", 401))
        }
        next()
    }catch (error) {
        res.status(401).send(error);
    }
}
