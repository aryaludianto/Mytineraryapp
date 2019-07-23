const express = require("express");
const app = express();
app.get("/test", (req, res) => res.send("Hello World Losers"));
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));




// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://arya123:arya123@clustermytinerary-wulcn.gcp.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("mytinerary").collection("cities");
//   // perform actions on the collection object
//   client.close();
// });

