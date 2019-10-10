const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Itinerary schema and model

const ItinerarySchema = new Schema({
  profileId: {
    type: String
  },
  title: {
    type: String,
  },
  city: {
    type: String,
  },
  profilePic: {
    type: String,
  },
  profileName: {
    type: String,
  },
  rating: {
    type: Number,
  },
  duration: {
    type: Number,
  },
  price: {
    type: String,
  },
  hashtags: {
    type: Array,
  },
  activities: [{
    name: String,
    address: String,
    img: String,
    time: Number,
    cost: String,
    comments: String
  }]
})


module.exports = Itinerary = mongoose.model('itinerary', ItinerarySchema);


