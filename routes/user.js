var express = require('express');
var router = express.Router();
var db = require('../database_config.js');

// Get the Userlist

router.get('/users', function(req, res) {
  var db = req.db;
  db.collection('users').find().toArray(function (err, result) {
    console.log(result);
  });
  res.send(200);
});


router.post('/adduser', function(req,res) {
  var db = req.db
  db.collection('users').insert(req.body, function(err, result){
    res.send(
      (err === null) ? { msg: '' } : { msg: err }
      );
  });
});


module.exports = router;
