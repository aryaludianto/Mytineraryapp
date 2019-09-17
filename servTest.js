const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

// get an instance of router
var router = express.Router();



// route middleware that will happen on every request
router.use(function(req, res, next) {

  // log each request to the console
  console.log(req.method, req.url);

  // continue doing what we were doing and go to the route
  next(); 
});

// ROUTES
// ==============================================
// sample route with a route the way we're used to seeing it
router.get("/", (req, res) => res.send("Hello World"));

// about page route (http://localhost:8080/about)
router.get('/about', function(req, res) {
  res.send('im the about page!'); 
});


// route with parameters (http://localhost:8080/hello/:name)
router.get('/hello/:name', function(req, res) {
  res.send('hello ' + req.params.name + '!');
});



// apply the routes to our application
app.use('/app', router);

app.listen(port, () => console.log(`Server running on port ${port}`));

