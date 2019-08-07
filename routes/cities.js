const express = require('express');
// get an instance of router
var router = express.Router();
const Cities = require('../models/cities')

// ROUTES
// ==============================================

//get a list
router.get("/", (req, res, next) => {
  Cities.find({}).sort({ name: 1 }).then((cities)=>{
    res.send(cities);
  })
})

router.get("/:city", (req, res, next) => {
  var name = (req.params.city).charAt(0).toUpperCase() + (req.params.city).slice(1)
  Cities.find({ name }).then((city) => {
    res.send(city);
  })
})





//add a new record
router.post("/", (req, res, next) => {
  Cities.create(req.body).then((cities) => {
    res.send(cities)
  }).catch(next)
});


//update record
router.put("/:id", (req, res, next) => {
  Cities.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    Cities.findOne({ _id: req.params.id }).then((cities) => {
      res.send(cities)
    })
  })

});

//delete a record
router.delete("/:id", (req, res, next) => {
  Cities.findByIdAndRemove({ _id: req.params.id }).then((cities) => {
    res.send(cities)
  });
});

// about page route (http://localhost:8080/about)
// router.get('/about', function (req, res) {
//   res.send('im the about page!');
// });


module.exports = router

// route middleware that will happen on every request
// router.use(function (req, res, next) {

  // log each request to the console
  // console.log(req.method, req.url);

  // continue doing what we were doing and go to the route
  // next();
// });

// route with parameters (http://localhost:8080/hello/:name)
// router.get('/hello/:name', function (req, res) {
  // res.send('hello ' + req.params.name + '!');
// });



// apply the routes to our application
// app.use('/', router);
// 
// app.listen(port, () => console.log(`Server running on port ${port}`));