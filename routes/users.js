const express = require('express');
// get an instance of router
var router = express.Router();
const Users = require('../models/users')

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
router.post("/", (req, res, next) => {
  Users.create(req.body).then((users) => {
    res.send(users)
  }).catch(next)
});


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
