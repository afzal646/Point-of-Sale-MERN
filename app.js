const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT;
require("./db/conn");
app.use(express.static(path.join(__dirname, "./public")));
app.use("/", require(path.join(__dirname, "./routes/routes.js")));
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var cookie = require("cookie");
var jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Methods: POST, GET, OPTIONS,PUT, DELETE');
// header('Access-Control-Allow-Headers: Content-Type, X-Auth-Token, Origin,Authorization');

// const corsOptions ={
//     origin:'http://localhost:3000',
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
const cors = require("cors");
app.use(cors());

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
