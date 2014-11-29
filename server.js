// BASE SETUP
// =============================================================================

// Begin packages

// call the packages we need
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var tweetParser = require('./tweet_parser.js');
var parseInstaObject = require('./instagram_parser.js');
var db = require('./database_config.js')

//============================================================================

// MUST BE ABOVE ROUTES--- I think <----- Remove when sure
app.use(function(req,res,next){
  req.db = db;
  next();
});

var routes = require('./routes/index');
var user = require('./routes/user');

// Routes

app.use('/', routes);
app.use('/', user);


//==============================================================================

// API

// twitter api
var util = require('util'),
    twitter = require('twitter');

// Twitter API keys, held in Enviroment Variables
var twit = new twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

// instagram api connection,
var ig = require('instagram-node').instagram();

// Instagram API keys, held in Enviroment Variables
    ig.use({ client_id: process.env.INSTA_CLIENT_ID,
             client_secret: process.env.INSTA_CLIENT_SECRET })

//===============================================================================

// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 9393;    // set our port
var server = app.listen(port);
var io = require('socket.io').listen(server);

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();

app.use(function(req, res, next){
  console.log("Request being made...");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.get('/twitter', function(req, res, next) {
  var term = req.query.term
  twit.search('#' + term, function(data) {
    tweets = tweetParser().parseTweets(data);
    res.json(tweets);
  });
});

app.get('/twitter_stream', function(req, res, next) {
  var streamed_tweets = []
  var term = req.query.term
  twit.stream('statuses/filter', {track: '#' + term}, function(stream){
    stream.on('data', function(data) {
        console.log(util.inspect(tweetParser().parseTweets(({"statuses": [data]}))));
        streamed_tweets.push(data);
        io.emit('tweet', data)
    });
  });
});

// Gets recent popular media
app.get('/insta', function(req, res, next) {
  var searchTag = req.query.term
  ig.tag_media_recent(searchTag, function(err, result, pagination, remaining, limit){
    insta = parseInstaObject().parseInstaObjects(result);
    res.json(insta);
  });
});

// START THE SERVER
// =============================================================================
module.exports = server;

app.listen(port);
console.log('Server Up on Port ' + port);
