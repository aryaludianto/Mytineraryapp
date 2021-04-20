const express = require("express");
const router = express.Router();
const Users = require('../models/users');
const Itinerary = require("../models/Itineraries");

router.post("/getfavorites", (req, res) => {
  const user = req.body.user;
  Users.findOne({ _id: user })
    .then(Users => {
      let itineraries = Users.favorite;

      return itineraries;
    })
    .then(itineraries => {
      Itinerary.find({ _id: { $in: itineraries } }).then(itinerariesFull => {
        res.status(200).send(itinerariesFull);
        return itinerariesFull;
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});



router.post("/deleteFavorite", (req, res) => {
  Users.findByIdAndUpdate(
    { _id: req.body.user },
    { $pull: { favorite: req.body.id } },
    { upsert: true }
  )
    .then(Users => {
      let favoriteArray = [];
      let oldArray = Users.favorite;
      oldArray.forEach(item => {
        if (item != req.body.id) {
          favoriteArray.push(item);
        }
      });

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
        error: err
      });
    });
});

module.exports = router;
