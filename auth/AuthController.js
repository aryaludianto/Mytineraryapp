// var express = require('express');
// var router = express.Router();
// var bodyParser = require('body-parser');
// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(bodyParser.json());
// var User = require('../models/users');


// var jwt = require('jsonwebtoken');
// var bcrypt = require('bcryptjs');
// var config = require('../keys/authConfig');


// router.post('/register', function(req, res) {
  
//   var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  
//   User.create({
//     name : req.body.name,
//     email : req.body.email,
//     password : hashedPassword
//   },
//   function (err, user) {
//     if (err) return res.status(500).send("There was a problem registering the user.")
//     // create a token
//     var token = jwt.sign({ id: user._id }, config.secret, {
//       expiresIn: 86400 // expires in 24 hours
//     });
//     res.status(200).send({ auth: true, token: token });
//   }); 
// });



const jwt = require("jsonwebtoken");
let config = require('../keys/authConfig');
// require("dotenv").config();

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  let decoded = jwt.verify(token, config.secret, (err, authData) => {
    if (err) {
      console.log(err);
      res.sendStatus(403);
    } else {
      return authData;
    }
  });
  req.decoded = decoded;

  next();
};
