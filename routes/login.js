const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require('../config/config');

router.post("/login", (req, res, next) => {
  Users.find({ email: req.body.email })
    .exec()
    .then(account => {
      if (account.length < 1) {
        return res.status(401).json({
          message: "Auth failed1"
        });
      }
      bcrypt.compare(req.body.password, account[0].password, (err, resp) => {
        console.log(err);
        if (err) {
          return res.status(401).json({
            message: "Auth failed2"
          });
        }
        if (resp) {
          const token = jwt.sign(
            {
              email: account.email,
              accountId: account[0]._id,
              name: account[0].firstname + " " + account[0].lastname
            },
            config.secret,
            {
              expiresIn: 86400
            }
          );
          return res.status(200).json({
            user: {
              username: account[0].userName,
              email: account[0].email,
              firstname: account[0].firstName,
              lastname: account[0].lastName,
              country: account[0].country
            },
            token: token
          });
        }
        res.status(401).json({
          message: "Auth failed3"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
