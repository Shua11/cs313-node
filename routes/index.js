var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/prove08', function(req, res, next) {
  res.render('prove08/prove08', { title: 'Express' });
});

module.exports = router;
