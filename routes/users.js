const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const VerifyToken = require('../keys/verifyToken');
const multer = require('multer');
const config = require('../config/config');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname)
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10
  },
  fileFilter: fileFilter
});


//get a list
router.get("/", (req, res, next) => {
  Users.find({}).sort({ username: 1 }).then((users) => {
    res.send(users);
  })
})

router.get("/:user", (req, res, next) => {
  let email = (req.params.user)
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

//adding file upload
// router.post('/', upload.single('file'), function(req, res, next) {
//   Users.findOne(
//     {
//       email: req.body.email
//     }
//   ),
//   function(err, accountExist){
//     console.log(accountExist);
//     if(err) throw err;
//     if (accountExist == null){
//       console.log("this is new account");
//       let hashedPassword = bcrypt.hashSync(req.body.password, 8);
//       Users.create({
//         profilePhoto: req.file.path,
//         username : req.body.username,
//         password : hashedPassword,
//         email : req.body.email,
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         country: req.body.country
//       },
//       function (err, user) {
//         if (err) return res.status(500).send("There was a problem registering the user.")
//         // create a token
//         let token = jwt.sign({ id: user._id }, config.secret, {
//           expiresIn: 86400 // expires in 24 hours
//         });
//         res.status(200).send({ auth: true, token: token });
//       }).then(function(user){
//         res.send(user)
//       }); 

//     } else {
//       console.log("account exists");
//       res.json(null);
//     }
//     }

// });

router.post("/", upload.single("file"), (req, res, next) => {
  Users.findOne(
    {
      email: req.body.email
    },
    function (err, existingAccount) {
      console.log(existingAccount);
      if (err) throw err;
      if (existingAccount == null) {
        console.log("this is a new account, I will add it");
        bcrypt.hash(req.body.password, 8, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err });
          } else {
            const user = new Users({
              profilePhoto: req.file.path,
              username: req.body.username,
              password: hash,
              email: req.body.email,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              country: req.body.country
            });
            Users.create(user).then(function (account) {
              res.send(account);
            });
          }
        });
      } else {
        console.log("account exists");
        res.json(null);
      }
    }
  );
});

router.post("/uploads", upload.single("profile"), (req, res) => {
  console.log("this is req.file", req.file);

  res.send("sending something back to say we reach upload path");
});


//User verification 
router.get('/me', VerifyToken, function (req, res, next) {

  Users.findById(req.userId,
    { password: 0 }, //projection no password being sent to the client
    function (err, user) {
      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");

      res.status(200).send(user);
    });
});

router.post('/login', function (req, res) {

  Users.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');

    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    let token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    res.status(200).send({ auth: true, token: token });
  });

});

router.get('/logout', function (req, res) {
  res.status(200).send({ auth: false, token: null });
});



//update User record
router.put("/:id", (req, res, next) => {
  Users.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    Users.findOne({ _id: req.params.id }).then((users) => {
      res.send(users)
    })
  })

});

//Add liked itinerary to the Liked list
router.put("/like/:id", (req, res, next) => {
  Users.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    Users.findOne({ _id: req.params.id }).then((users) => {
      res.send(users)
    })
  })

});

//Delete 
router.delete("/:id", (req, res, next) => {
  Cities.findByIdAndRemove({ _id: req.params.id }).then((users) => {
    res.send(users)
  });
});

module.exports = router