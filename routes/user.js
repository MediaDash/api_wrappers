var express = require('express');
var router = express.Router();
var db = require('../database_config.js');

// Get the Userlist

router.get('/user', function(req, res) {
  db.collection('user').find().toArray(function(err, items) {
    console.log(items);
  });
  res.send(200);
});


module.exports = router;


// router.post('/user', function(req, res) {
//   db.collection('user').insert(req.body, function(err, result) {
//     res.send(
//       (err === null) ? { msg: '' } : { msg: err }
//       );
//   });
// });
