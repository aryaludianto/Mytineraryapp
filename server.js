const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser'); //Body parser
const mongoose = require('mongoose')


// ---- THIS IS MIDDLEWARE ----------

app.use(express.static('client'))

//body parsers used
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//initialized routes
app.use('/cities', require('./routes/cities'))
app.use('/itineraries', require('./routes/itineraries'))

//error handling middleware
app.use((err, req, res, next)=>{
  res.status(422).send({ error: err.mesage })
})

//---- THE END OF MIDDLEWARE ------

const uri = 'mongodb+srv://arya123:arya123@clustermytinerary-wulcn.gcp.mongodb.net/mytinerary?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true });
mongoose.Promise = global.Promise;


app.listen(port, () => {
      console.log(`app working on ${port}`)
    })

















