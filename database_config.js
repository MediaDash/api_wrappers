// Database Set up

var mongo = require('mongoskin');
var db  = mongo.db('mongodb://mediadash:mediadash1@ds053370.mongolab.com:53370/testing_node')


module.exports = db;
