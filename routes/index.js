var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('<html><body><h1>This is a Test Page</h1></body></html>');
});


module.exports = router;