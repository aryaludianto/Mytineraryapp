const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require("jsonwebtoken");
const config = require('../config/config');

// auth login
router.get('/login', (req, res) => {
  res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
  // handle with passport
  res.send('logging out');
});


// auth with google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

//callback routes for google to riderect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.send('you have reach the callback URI')
})

router
  .route("/googlelogin")
  .post(
    passport.authenticate("googleToken", { session: false }),
    (req, res) => {
      const user = req.user;
      const token = jwt.sign(
        {
          email: user.email,
          name: user.firstName + " " + user.lastName
        },
        config.secret,
        {
          expiresIn: "24h"
        }
      );

      // console.log("this is JWT from auth-routes")
      // console.log("this is config secret : " + config.secret);
      // console.log("this is user email : " + user.email);
      // console.log("this is user name : " + user.firstName + "  " + user.lastName);
      // console.log(token)
      // console.log("this is JWT from auth-routes")

      // console.log("this is user", user);
      res.status(200).json({ user: user, token: token });
    }
  );

module.exports = router
