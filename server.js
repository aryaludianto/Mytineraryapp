const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const routes = require('./routes/api');
const bodyParser = require('body-parser'); //Body parser
const mongoose = require('mongoose')


// ---- THIS IS MIDDLEWARE ----------
//body parsers used
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//initialized routes
app.use('/api', routes)

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





// const MongoClient = require('mongodb').MongoClient
// var ObjectID = require('mongodb').ObjectID; // we will use this later
// // const uri = 'mongodb+srv://arya123:arya123@clustermytinerary-wulcn.gcp.mongodb.net/test?retryWrites=true&w=majority';
// MongoClient.connect(uri, { useNewUrlParser: true }, (err, db) => {
//   // ... start the server
//   var dbase = db.db("mytinerary");
//   if (err) return console.log(err)

//   app.get('/cities', (req, res) => {
//     dbase.collection('cities').find().toArray((err, results) => {
//       res.send(results)
//     });
//   });

//   app.post('/cities/add', (req, res, next) => {

//     var city = {
//       country: req.body.country,
//       name: req.body.name
//     };

//     dbase.collection("cities").insertOne(city, (err, results) => {
//       if (err) {
//         console.log(err);
//       }

//       res.send('city added successfully');
//     });
//   });


//   app.listen(port, () => {
//     console.log(`app working on ${port}`)
//   })
// })












