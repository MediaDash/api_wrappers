// BASE SETUP
// =============================================================================

// Begin packages

// call the packages we need
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var tweetParser = require('./tweet_parser.js');
var parseInstaObject = require('./instagram_parser.js');
var mongo = require('mongoskin');
var db = require('./database_config.js');

//============================================================================

// MUST BE ABOVE ROUTES--- I think <----- Remove when sure
app.use(function(req,res,next){
  req.db = db;
  next();
});

app.use(function(req, res, next){
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");

  next();
});

var routes = require('./routes/index');
var term = require('./routes/term');
var addterm = require('./routes/term');
// Routes
app.use('/', routes);
app.use('/', term);

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
             client_secret: process.env.INSTA_CLIENT_SECRET });

//===============================================================================

// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 9393;    // set our port

var server = app.listen(3000);
var http = require('http').Server(app);
var socket_io = require('socket.io')({
    "transports": ["xhr-polling"],
    "polling duration": 10
});

var io = socket_io.listen(http, {log: false, origins:'*'});

console.log(http);

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();

app.get('/twitter', function(req, res, next) {
  var tweets, term;
  term = req.query.term;
  twit.search('#' + term, function(data) {
    if (data && data.statuses && data.statuses.length) {
      tweets = tweetParser().parseTweets(data);
    } else {
      tweets = {};
    }
    res.json(tweets);
  });
});

// Streams twitter hastags for a supplied query search term
// The returned object from Twitter is persisted to our DB
// Also supplied through io.emit to our front end
app.get('/twitter_stream', function(req, res, next) {
  var term;
  term = req.query.term;
  twit.stream('statuses/filter', {track: '#' + term}, function(stream){
    stream.on('data', function(data) {
      var twitData = (tweetParser().parseTweets({"statuses": [data]}));
      io.emit('tweet', twitData);
      // db.collection('term').insert(twitData, function(err, result){
      //   if ( !err ) {
      //     return { msg: '' };
      //   } else {
      //     return { msg: err };
      //   }
      // });
    });
  });
});

// Gets recent popular media
app.get('/insta', function(req, res, next) {
  var searchTag;
  searchTag = req.query.term;
  ig.tag_media_recent(searchTag, function(err, result, pagination, remaining, limit){
    if(err) {
      console.log(err);
    }
    if (result) {
      insta = parseInstaObject().parseInstaObjects(result);
    } else {
      insta = {};
    }
    res.json(insta);
  });
});


app.get('/instaLatest', function(req, res, next) {
  var searchTag, maxTimestamp, instas, instasAfterTime;
  searchTag = req.query.term;
  maxTimestamp = req.query.maxTimestamp;
  instas = [];
  var search = function(err, result, pagination, remainging, limit){
    if(err) {
      console.log(err);
    }
    instasAfterTime = parseInstaObject().parseInstaObjectsBeforeTime(result, maxTimestamp);
    for ( var i = 0; i < instasAfterTime.length; i++ ) {
      instas.push( instasAfterTime[i] );
    }
    res.json(instas);
    };
  ig.tag_media_recent(searchTag, search);
});

// Uses the InstagramId as the next search peram entered through query.
// SHOULD BE DOCUMENTED!
app.get('/instaRecent', function(req, res, next) {
  var searchTag, maxTimestamp, instas, instasAfterTime, respondToClient;
  searchTag = req.query.term;
  maxTimestamp = req.query.maxTimestamp;
  instas = [];
  respondToClient = function() {
    res.json(instas);
  };
  var longsearch = function(err, result, pagination, remainging, limit){
    if(err) {
      console.log(err);
    } else {
      instasAfterTime = parseInstaObject().parseInstaObjectsBeforeTime(result, maxTimestamp);
      for ( var i = 0; i < instasAfterTime.length; i++ ) {
        instas.push( instasAfterTime[i] );
      }
      if (instas.length < 101 || instasAfterTime === 0) {
        pagination.next(longsearch);
      } else {
        respondToClient();
      }
    }
  };
  ig.tag_media_recent(searchTag, longsearch);
});


// START THE SERVER
// =============================================================================
console.log('Server Up on Port ' + port);

http.listen(port, function(){
  console.log('listening on ' + port);
});

io.on('connection', function(socket){
    console.log("CONNECTED!!");
});

module.exports = server;

