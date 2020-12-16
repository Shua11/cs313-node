var express = require('express');
var router = express.Router();

const sendMail = require('./../views/actions/mail')

router.use((req, res, next) => {
    username = req.cookies.username
    if (username) {
        res.locals.logedIn = username
    } else {
        res.locals.logedIn = ''
    }

    if (req.query.msg === 'fail') {
        res.locals.msgFail = `This username and password combination does not exist.`
    } else {
        res.locals.msgFail = ``
    }
    next()
})

/* GET home page. */
router.get('/', function (req, res, next) {
    // username = req.cookies.username
    if (res.locals.logedIn) {
        res.redirect('/users')
    } else {
        res.render('index', {
            title: 'PRC Engineering',
            activeNav: 'index'
        })
    }
})

router.get('/who-we-are', (req, res, next) => {
    res.render('who-we-are', {
        title: 'PRC Engineering',
        activeNav: 'who'
    })
})

router.get('/services', (req, res, next) => {
    res.render('services', {
        title: 'PRC Engineering',
        activeNav: 'services'
    })
})

router.get('/projects', (req, res, next) => {
    res.render('projects', {
        title: 'PRC Engineering',
        activeNav: 'projects'
    })
})

router.get('/contact-us', (req, res, next) => {
    res.render('contact-us', {
        title: 'PRC Engineering',
        activeNav: 'contact',
        emailSent: ''
    })
})

router.get('/login', (req, res, next) => {
    res.render('login/sign-in', {
        title: 'PRC Engineering: Sign In'
    })
})

router.post('/process_login', (req, res, next) => {
    const username = req.body.txtUser
    const password = req.body.txtPassword

    //TODO: validation script
    // Check user credentials if they are valid with db

    if (password == 'asdf') {
        res.cookie('username', username)
        res.redirect('/users')
    } else {
        res.redirect('/login?msg=fail')
    }
})

router.get('/logout', (req, res, next) => {
    res.clearCookie('username')
    // res.render('test', {
    //     username: req.cookies.username
    // })
    res.redirect('/login')
})



router.get('/addproject', (req, res, next) => {
    res.render('./manage/add-project', {
        title: 'PRC Engineering',
        activeNav: 'edit',
        emailSent: ''
    })
})

router.post('/email', (req, res, next) => {

    const { firstName, lastName, email, phone, subject, message } = req.body

    let text = `${firstName} ${lastName} sent a message.\n"${message}"\n\nYou can contact them by:\nEmail: ${email}`

    if (phone) {
        text += `\nPhone: ${phone}`
    }

    sendMail(email, subject, text, function (err, data) {
        if (err) {
            res.render('contact-us', {
                title: 'PRC Engineering',
                activeNav: 'contact',
                emailSent: 'faliure'
            })
        } else {
            res.render('contact-us', {
                title: 'PRC Engineering',
                activeNav: 'contact',
                emailSent: 'success'
            })
        }
    })
})


module.exports = router;
