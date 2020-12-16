var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    // res.render('test', {
    //     username: req.cookies.username
    // })
    res.render('index', {
        title: 'PRC Engineering',
        activeNav: 'index',

    })
})

router.get('/manage-projects', (req, res, next) => {
    res.render('./manage/manage-projects', {
        title: 'PRC Engineering',
        activeNav: 'edit',
        emailSent: ''
    })
})


/* GET users listing. */
router.get('/test', (req, res, next) => {
    res.send('test respond with a resource');
})


module.exports = router;
