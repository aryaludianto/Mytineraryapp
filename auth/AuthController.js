require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  // console.warn("hei this is the authcontroller");
  // console.log("this is jwtsecret : " + jwtSecret)
  // console.log("this is the token : " + token)

  let decoded = jwt.verify(token, jwtSecret, (err, authData) => {
    if (err) {
      console.log(err);
      res.sendStatus(403);
    } else {
      return authData;
    }
  });

  req.decoded = decoded;

  next();
};
