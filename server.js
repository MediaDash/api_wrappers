// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');    // call express
var app        = express();         // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
mongoose.connect('mongodb://mediadash:mediadash1@ds053370.mongolab.com:53370/testing_node');
var Bear     = require('./app/models/bear');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 9393;    // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();        // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)

router.use(function(req, res, next){
  console.log('Something is happening');
  next();
})

router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});



// more routes for our API will happen here

// routes that end in /bears

router.route('/bears')

  // create a bear (accessed at POST http://localhost:8080/api/bears)
  .post(function(req, res) {
    console.log(req)
    console.log(res)
    var bear = new Bear();    // create a new instance of the Bear model
    bear.name = req.body.name;  // set the bears name (comes from the request)
    console.log(bear);
    // save the bear and check for errors
    bear.save(function(err) {
      console.log("****SAVING****");
      if (err)
        res.send(err);

      res.json({ message: 'Bear created!' });
    });

  });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);