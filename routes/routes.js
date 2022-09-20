const express = require("express");
const app = express();
const router = express.Router();
const  cookieParser = require('cookie-parser');
app.use(cookieParser());
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonparser = bodyParser.json()
app.use(bodyParser.json())
const cors = require("cors");
router.use(cors());
const userlogincontroller = require("../controllers/registercontroller");
const itemcontroller = require("../controllers/itemcontroller")
const {auth , isAdmin, isUser} = require("../middleware/auth");
const ordercontroller = require("../controllers/ordercontroller")

router.post("/register", jsonparser, userlogincontroller.register);

router.post("/login", jsonparser , urlencodedParser , userlogincontroller.login);

//router.use('/changeUserPassword', )

router.post('/changeUserPassword', jsonparser, urlencodedParser,auth , userlogincontroller.changeUserPassword)

router.post('/sendUserPasswordResetEmail',jsonparser,userlogincontroller.sendUserPasswordResetEmail)

router.post('/resetpasswordlink/:id/:token',jsonparser, userlogincontroller.resetpassword)

router.get('/logout',userlogincontroller.logout)

router.get('/alluser',cors(),userlogincontroller.alluser);

router.get("/edituser", urlencodedParser, userlogincontroller.edituser);

router.post("/updateuser", jsonparser, userlogincontroller.updateuser);

router.get("/deleteuser", userlogincontroller.deleteuser);

router.post("/additem", jsonparser,cors(), itemcontroller.additem);

router.get('/allitem',cors(),itemcontroller.allitem);

router.post('/updateitem', jsonparser , itemcontroller.updateitem);

router.get('/deleteitem' , itemcontroller.deleteitem)

router.get('/',(req,res)=>{
    res.send(`Hello World from Server`)
})

router.post('/addorder',urlencodedParser,jsonparser,ordercontroller.addorder);

router.get('/allorder',cors(),ordercontroller.allorder);

module.exports = router;