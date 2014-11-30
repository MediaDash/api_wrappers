var express = require('express');
var router = express.Router();
var db = require('../database_config.js');

// Get the Userlist

router.get('/term', function(req, res) {
  var db = req.db;
  var list;
  db.collection('term').find().toArray(function (err, result) {
    list = result;
    console.log(result);
    res.json(list);
  });
});

module.exports = router;
