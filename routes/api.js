const express = require('express');
// get an instance of router
var router = express.Router();
const Cities = require('../models/cities')

// ROUTES
// ==============================================

//get a list
router.get("/cities", (req, res, next) => {
  Cities.find({}).then((cities)=>{
    res.send(cities);
  })
})

//add a new record
router.post("/cities", (req, res, next) => {
  Cities.create(req.body).then((cities) => {
    res.send(cities)
  }).catch(next)
});


//update record
router.put("/cities/:id", (req, res, next) => {
  Cities.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    Cities.findOne({ _id: req.params.id }).then((cities) => {
      res.send(cities)
    })
  })

});

//delete a record
router.delete("/cities/:id", (req, res, next) => {
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