require('dotenv').config();

module.exports = config = {
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  },
  mongoDB: {
    uri: process.env.MONGGO_DB_URI
  },
  secret: process.env.JWT_SECRET
}