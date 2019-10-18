const express = require('express');
// get an instance of router
var router = express.Router();
const Itinerary = require('../models/Itineraries');
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

module.exports = router

