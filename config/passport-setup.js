const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../keys/keys');
const Users = require('../models/users')
const GooglePlusTokenStrategy = require("passport-google-plus-token");


// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id).then((user) => {
//       done(null, user);
//   });
// });


passport.use(
  "googleToken",
  // new GoogleStrategy({
    new GooglePlusTokenStrategy({
    //options for the strategy
    // callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
  }, (accessToken, refreshToken, profile, done) => {
    //Check if user already exists in our DB

    console.log("this is profile from google", profile);
    Users.findOne({ email: profile.emails[0].value }).then(currentUser => {
      if (currentUser) {
        console.log("user is", currentUser);
        let user = currentUser;
        done(null, user);
      } else {
        var profilePhoto = profile.photos[0].value;
        var profilePhotoEnlarged = profilePhoto.replace("sz=50", "sz=150");
        new Users({
          profilePhoto: profilePhotoEnlarged,
          username: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value
        })
          .save()
          .then(newAccount => {
            console.log("new user created:", + newAccount);
            let user = newAccount;
            done(null, user);
          });
      }
    });


//     Users.findOne({ googleId: profile.id }).then((currentUser) => {
//       if (currentUser) {
//         // already have the user
// console.log('user is:', currentUser)
//       } else {
//         //if not create user in our DB
//         new Users({
//           username: profile.displayName,
//           firstname: profile.name.givenName,
//           lastname: profile.name.familyName,
//           googleId: profile.id
//         }).save().then((newUser) => {
//           console.log('new user created: ' + newUser);
//           done(null, newUser)
//         })

//       }
//     })
  })
)