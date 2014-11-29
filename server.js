// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');    // call express
var app        = express();         // define our app using express
var bodyParser = require('body-parser');
// var mongoose   = require('mongoose');
// mongoose.connect('mongodb://mediadash:mediadash1@ds053370.mongolab.com:53370/testing_node');
var tweetParser = require('./tweet_parser.js');

// twitter api
var util = require('util'),
    twitter = require('twitter');

var twit = new twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

// var mongoose   = require('mongoose');
// mongoose.connect('mongodb://mediadash:mediadash1@ds053370.mongolab.com:53370/testing_node');

var parseInstaObject = require('./instagram_parser.js');

var ig = require('instagram-node').instagram();
    ig.use({ client_id: process.env.INSTA_CLIENT_ID,
             client_secret: process.env.INSTA_CLIENT_SECRET })
var searchTagOne = 'money'

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 9393;    // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();        // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:9393/api)

router.use(function(req, res, next){
  console.log("Request being made...");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

router.get('/twitter/', function(req, res, next) {
  var term = req.query.term
  twit.search('#' + term, function(data) {
    tweets = tweetParser().parseTweets(data);
    res.json(tweets);
  });
});

// Gets recent popular media
router.get('/insta', function(req, res) {
  var instagramSearch = ig.tag_media_recent(searchTagOne, function(err, result, pagination, remaining, limit){
    insta = parseInstaObject().parseInstaObjects(result);
    res.json(insta);
  });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
