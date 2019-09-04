const express = require('express');
// get an instance of router
var router = express.Router();
const passport = require('passport')

// ROUTES
// ==============================================

// auth login
router.get('/login', (req, res) => {
  res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
  // handle with passport
  res.send('logging out');
});

// auth with google+
router.get('/google',passport.authenticate('google',{
  scope:['profile']
}));


module.exports = router
