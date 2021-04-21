const passport = require('passport');
const Users = require('../models/users')
const GooglePlusTokenStrategy = require("passport-google-plus-token");
const config = require('./config');

const absoluteUri = 'https://grim-monster-25961.herokuapp.com'

console.log('below is the redirect url');
console.log({ callbackURL: absoluteUri + '/auth/google/redirect' })
console.log('above is the redirect url');

passport.use(
  "googleToken",
  new GooglePlusTokenStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: absoluteUri + '/auth/google/redirect',
    proxy: true
  }, (accessToken, refreshToken, profile, done) => {

    // console.log("this is profile from google", profile);
    Users.findOne({ email: profile.emails[0].value }).then(currentUser => {
      if (currentUser) {
        // console.log("user is", currentUser);
        let user = currentUser;
        done(null, user);
      } else {
        const profilePhoto = profile.photos[0].value;
        const profilePhotoEnlarged = profilePhoto.replace("sz=50", "sz=150");

        new Users({
          profilePhoto: profilePhotoEnlarged,
          username: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value
        })
          .save()
          .then(newAccount => {
            let user = newAccount;
            done(null, user);
          });
      }
    });
  })
)