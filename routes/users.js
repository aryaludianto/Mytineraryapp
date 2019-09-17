const express = require('express');
// get an instance of router
var router = express.Router();
const Users = require('../models/users');


var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../keys/authConfig');
var VerifyToken = require('../keys/verifyToken')

// ROUTES
// ==============================================

//get a list
router.get("/", (req, res, next) => {
  Users.find({}).sort({ username: 1 }).then((users)=>{
    res.send(users);
  })
})

router.get("/:user", (req, res, next) => {
  var email = (req.params.user)
  Users.find({ email }).then((user) => {
    res.send(user);
  })
})

//add a new record
// router.post("/", (req, res, next) => {
//   Users.create(req.body).then((users) => {
//     res.send(users)
//   }).catch(next)
// });

//auth starts

router.post('/', function(req, res, next) {
  
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  
  console.log({
    username : req.body.username,
    password : hashedPassword,
    email : req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    country: req.body.country
  })

  Users.create({
    username : req.body.username,
    password : hashedPassword,
    email : req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    country: req.body.country
  },
  function (err, user) {
    if (err) return res.status(500).send("There was a problem registering the user.")
    // create a token
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });
  }); 
});



//
router.get('/me', VerifyToken, function(req, res, next) {
    
    Users.findById(req.userId,
      {password:0}, //projection no password being sent to the client
      function (err, user) {
      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");
      
      res.status(200).send(user);
    });
  });


  router.post('/login', function(req, res) {

    Users.findOne({ email: req.body.email }, function (err, user) {
      if (err) return res.status(500).send('Error on the server.');
      if (!user) return res.status(404).send('No user found.');
      
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
      
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      
      res.status(200).send({ auth: true, token: token });
    });
    
  });
  
  

  router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
  });



//auth ends



//update record
router.put("/:id", (req, res, next) => {
  Users.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    Users.findOne({ _id: req.params.id }).then((users) => {
      res.send(users)
    })
  })

});

//delete a record
router.delete("/:id", (req, res, next) => {
  Cities.findByIdAndRemove({ _id: req.params.id }).then((users) => {
    res.send(users)
  });
});



module.exports = router
