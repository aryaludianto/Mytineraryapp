const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser'); //Body parser
const mongoose = require('mongoose')
const keys = require('./keys/mongoKey')


// ---- THIS IS MIDDLEWARE ----------
app.use(express.static('client'))

//body parsers used
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//auth
app.use('/auth', require('./routes/auth-routes'))


//initialized routes
app.use('/users', require('./routes/users'))
app.use('/cities', require('./routes/cities'))
app.use('/itineraries', require('./routes/itineraries'))

//error handling middleware
app.use((err, req, res, next)=>{
  res.status(422).send({ error: err.mesage })
})

//---- THE END OF MIDDLEWARE ------

const uri = keys.mongoDB.uri;


mongoose.connect(uri, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

app.listen(port, () => {
      console.log(`app working on ${port}`)
    })

















