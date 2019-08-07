const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Itinerary schema and model

const ItinerarySchema = new Schema({
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
    type: Number,
  },
  hashtag: {
    type: Array,
  }
})


module.exports = Itinerary = mongoose.model('itinerary', ItinerarySchema);


