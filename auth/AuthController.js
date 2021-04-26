const config = require('../config/config')
const jwt = require("jsonwebtoken");
const jwtSecret = config.secret;

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  let decoded = jwt.verify(token, jwtSecret, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      return authData;
    }
  });

  req.decoded = decoded;

  next();
};
