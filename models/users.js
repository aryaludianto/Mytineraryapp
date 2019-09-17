const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create cities schema and model

const UserSchema = new Schema({
  profilePhoto: {
    type: String
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  email:{
    type: String,
  },
  firstName:{
    type: String,
  },
  lastName:{
    type: String,
  },
  country:{
    type: String,
  },
  googleId:{
    type: String
  },
  favourite: {
    type: Array
  }
})


const Users = mongoose.model('users', UserSchema);

module.exports = Users;

