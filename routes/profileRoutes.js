const express = require("express");
const router = express.Router();

const auth = require('../auth/AuthController');

const Users = require('../models/users');

router.post("/profiles", auth, (req, res) => {
  let emailOfUser = req.body.emailOfUser;
  Users.find({ email: emailOfUser })
    .then(account => res.send(account))
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
