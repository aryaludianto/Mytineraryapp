require('dotenv').config();

module.exports = {
  mongoDB: {
    uri: process.env.MONGGO_DB_URI
  }
}