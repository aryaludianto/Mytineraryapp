const express = require('express');
// get an instance of router
var router = express.Router();
const Itinerary = require('../models/Itineraries');
const Users = require('../models/users')
const multer = require('multer');





const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads/activities');
  },
  filename: function(req, file, cb){
    cb(null, new Date().toISOString() + file.originalname)
  }
});

const fileFilter = (req, file, cb) => {

  if (
    file.mimetype ==='image/jpeg' ||
    file.mimetype ==='image/png' ||
    file.mimetype ==='image/jpg'
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





// ROUTES
// ==============================================

//get a list
router.get("/", (req, res, next) => {
  Itinerary.find({}).then((itinerary) => {
    res.send(itinerary);
  })
})


router.get("/:city", (req, res, next) => {
  var city = (req.params.city).charAt(0).toUpperCase() + (req.params.city).slice(1)
  Itinerary.find({ city }).then((itinerary) => {
    res.send(itinerary);
  })
})


router.get("/activity/:activityId", (req, res, next) => {
  var id = req.params.activityId
  console.log(id)
  Itinerary.find({ _id:id }).then((itinerary) => {
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
  console.log("this is req.file", req.file);
  res.send(req.file.path);
});



//adding favorite
router.put("/itineraries/favourite", (req, res) => {
  console.log("req.body for adding favourite", req.body);
  
  Users.findByIdAndUpdate(
    { _id: req.body.user },
    { $push: { favourite: req.body.itineraryFavourite } },
    { upsert: true }
  )

    .then(Users => {
      console.log("Users", Users);
      let favouriteArray = Users.favourite;
      console.log("favouriteArray before", favouriteArray);
      favouriteArray.push(req.body.itineraryFavourite);
      console.log("favouriteArray after", favouriteArray);
      return favouriteArray;

    })
    .then(favouriteArray => {
      Itinerary.find({ _id: { $in: favouriteArray } }).then(itinerariesFull => {
        res.status(200).send(itinerariesFull);
        return itinerariesFull;
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router

