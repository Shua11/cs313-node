var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* BEGIN Prove09. */
router.get('/prove09', function(req, res, next) {
  let postage = '';
  res.render('prove09/prove09', { 
    title: 'Prove09',
    postage: postage
   });
});

router.post('/prove09/getRate', function(req, res, next) {
  
  let postage = calculateRate(Number(req.body.itemWeight), req.body.itemType)
  res.render('prove09/prove09', { 
    title: 'Prove09',
    postage: postage,
    iW: req.body.itemWeight,
    iT: req.body.itemType
  });
});

function calculateRate(weight, type) {
  result = '';
  if (type === 'Letters (Stamped)') {
    if (weight <= 1) {
      result = '$0.55'
    } else if (weight <= 2) {
      result = '$0.70'
    } else if (weight <= 3) {
      result = '$0.85'
    } else if (weight <= 3.5) {
      result = '$1.00'
    } else {
      result = 'Error: Incorrect weight'
    }
  } else if (type === 'Letters (Metered)') {
    if (weight <= 1) {
      result = '$0.50'
    } else if (weight <= 2) {
      result = '$0.65'
    } else if (weight <= 3) {
      result = '$0.80'
    } else if (weight <= 3.5) {
      result = '$0.95'
    } else {
      result = 'Error: Incorrect weight'
    }
  } else if (type === 'Large Envelopes (Flats)') {
    if (weight <= 13) {
      result = (.2 * Math.floor(weight)) + .8;
      result = '$' + result.toFixed(2);
    }
  } else if (type === 'First-Class Package Service—Retail') {
    if (weight <= 4) {
      result = '$3.80'
    }
    if (weight <= 8) {
      result = '$4.60'
    }
    if (weight <= 12) {
      result = '$5.30'
    }
    if (weight <= 13) {
      result = '$5.90'
    } else {
      result = 'Error: Incorrect weight'
    }
  } else {
    result = "Error";
  }
  return result;
}
/* END Prove09*/

module.exports = router;
