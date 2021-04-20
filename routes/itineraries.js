const express = require('express');
const router = express.Router();
const Itinerary = require('../models/Itineraries');
const Users = require('../models/users')
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/activities');
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


// ROUTES OF ITINERARIES

//get itineraries list
router.get("/", (req, res, next) => {
  Itinerary.find({}).then((itinerary) => {
    res.send(itinerary);
  })
})

//get City
router.get("/:city", (req, res, next) => {
  var city = (req.params.city).charAt(0).toUpperCase() + (req.params.city).slice(1)
  Itinerary.find({ city }).then((itinerary) => {
    res.send(itinerary);
  })
})

//Get Activity
router.get("/activity/:activityId", (req, res, next) => {
  var id = req.params.activityId
  console.log(id)
  Itinerary.find({ _id: id }).then((itinerary) => {
    console.log(itinerary)
    res.send(itinerary);
  })
})

//add a new record
router.post("/", (req, res, next) => {
  Itinerary.create(req.body).then((itinerary) => {
    res.send(itinerary)
  }).catch(next)
});


//update record
router.put("/:id", (req, res, next) => {
  Itinerary.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    Itinerary.findOne({ _id: req.params.id }).then((itinerary) => {
      res.send(itinerary)
    })
  })

});

//delete a record
router.delete("/:id", (req, res, next) => {
  Itinerary.findByIdAndRemove({ _id: req.params.id }).then((itinerary) => {
    res.send(itinerary)
  });
});

//adding image
router.post("/uploads", upload.single("file"), (req, res) => {
  res.send(req.file.path);
});

//adding favorite
router.put("/itineraries/favorite", (req, res) => {

  Users.findByIdAndUpdate(
    { _id: req.body.user },
    { $push: { favorite: req.body.itineraryFavorite } },
    { upsert: true }
  ).then(Users => {
    let favoriteArray = Users.favorite;
    favoriteArray.push(req.body.itineraryFavorite);
    return favoriteArray;
  })
    .then(favoriteArray => {
      Itinerary.find({ _id: { $in: favoriteArray } }).then(itinerariesFull => {
        res.status(200).send(itinerariesFull);
        return itinerariesFull;
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "saving favorite error"
      });
    });
});

module.exports = router

