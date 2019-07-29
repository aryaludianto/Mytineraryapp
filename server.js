const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const routes = require('./routes/api')


//initialized routes
app.use('/api', routes)




const MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID; // we will use this later
const bodyParser = require('body-parser'); //Body parser

//body parsers used
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uri = 'mongodb+srv://arya123:arya123@clustermytinerary-wulcn.gcp.mongodb.net/test?retryWrites=true&w=majority';

MongoClient.connect(uri, { useNewUrlParser: true }, (err, db) => {
  // ... start the server
  var dbase = db.db("mytinerary");
  if (err) return console.log(err)


  app.post('/cities/add', (req, res, next) => {

    var city = {
      country: req.body.country,
      name: req.body.name
    };

    dbase.collection("cities").insertOne(city, (err, result) => {
      if (err) {
        console.log(err);
      }

      res.send('city added successfully');
    });
  });


  app.get('/cities', (req, res) => {
    dbase.collection('cities').find().toArray((err, results) => {
      res.send(results)
    });
  });




  app.listen(port, () => {
    console.log(`app working on ${port}`)
  })
})








//mongodb from atlas
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://arya123:arya123@clustermytinerary-wulcn.gcp.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("mytinerary").collection("cities");
//   // perform actions on the collection object
//   console.log(collection.s)
//   client.close();
// });



