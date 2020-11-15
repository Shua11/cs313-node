var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/prove09', function(req, res, next) {
  res.render('prove09/prove09', { title: 'Express' });
});

module.exports = router;
