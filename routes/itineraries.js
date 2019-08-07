const express = require('express');
// get an instance of router
var router = express.Router();
const Itinerary = require('../models/Itineraries')

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
    console.log(itinerary)
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

module.exports = router

