const express = require("express");
const router = express.Router();
const Users = require('../models/users');
const Itinerary = require("../models/Itineraries");

router.post("/getfavourites", (req, res) => {
  let user = req.body.user.email;
  console.log("let this be user of getfavourites back end", user);

  Users.findOne({ email: user })
    .then(Users => {
      let itineraries = Users.favourite;

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

router.post("/deleteFavourite", (req, res) => {
  Users.findOneAndUpdate(
    { email: req.body.user.email },
    { $pull: { favourite: req.body.id } },
    { upsert: true }
  )

    .then(Users => {
      let favouriteArray = [];
      let oldArray = Users.favourite;
      oldArray.forEach(item => {
        if (item != req.body.id) {
          favouriteArray.push(item);
        }
      });

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

module.exports = router;
