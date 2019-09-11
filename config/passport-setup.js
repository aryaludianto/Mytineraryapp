const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('../keys/keys');
const Users = require('../models/users')

passport.use(
  new GoogleStrategy({
    //options for the strategy
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
  }, (accessToken, refreshToken, profile, done) => {
    //Check if user alreadyy exists in our DB

    Users.findOne({ googleId: profile.id }).then((currentUser) => {
      if (currentUser) {
        // already have the user
console.log('user is:', currentUser)
      } else {
        //if not create user in our DB
        new Users({
          username: profile.displayName,
          firstname: profile.name.givenName,
          lastname: profile.name.familyName,
          googleId: profile.id
        }).save().then((newUser) => {
          console.log('new user created: ' + newUser)
        })

      }
    })
  })
)