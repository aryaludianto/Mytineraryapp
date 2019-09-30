const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser'); //Body parser
const mongoose = require('mongoose')
const keys = require('./keys/mongoKey')
const passportSetup = require('./config/passport-setup')


//initialize multer
const GridFsStorage = require('multer-gridfs-storage')
const multer = require('multer')
const Grid = require("gridfs-stream");
const crypto = require('crypto');





// ---- THIS IS MIDDLEWARE ----------
app.use(express.static('client'))

//Midware for image
app.use(express.static('uploads'))
app.use('/uploads', express.static('uploads'))




//body parsers used
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//initialized routes
app.use('/users', require('./routes/users'))
app.use('/cities', require('./routes/cities'))
app.use('/itineraries', require('./routes/itineraries'))

//auth
app.use('/auth', require('./routes/auth-routes'))
app.use('/log', require('./routes/login'))



//profile

app.use("/profile", require("./routes/profileRoutes"));




//error handling middleware
app.use((err, req, res, next) => {
  res.status(422).send({ error: err.mesage })
})







//---- THE END OF MIDDLEWARE ------

// const uri = keys.mongoDB.uri;
// mongoose.connect(uri, { useNewUrlParser: true });
// mongoose.Promise = global.Promise;


const uri = keys.mongoDB.uri;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true 
});
// mongoose.Promise = global.Promise;



//Change for uploading images

let gfs;
var conn = mongoose.createConnection(uri);
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
  //set!
});


const storage = new GridFsStorage({
  url: uri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads"
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

app.post("/uploads", upload.single("file"), (req, res) => {
  res.send("yup we got your image upload");
});


app.use("/itinerary/uploads", express.static("uploads"));
app.use("/activity/uploads", express.static("uploads"));

mongoose.connection
  .once("open", () => {
    console.log("Connection has been made, now make fireworks...");
  })
  .on("error", function(error) {
    console.log("Connection error:", error);
  });







mongoose.Promise = global.Promise;
app.listen(port, () => {
  console.log(`app working on ${port}`)
})