require('dotenv').config();

var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

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

    let featuredCards = ''
    let featuredModals = ''

    const connectionString = process.env.DATABASE_URL;

    const pool = new Pool({ connectionString: connectionString });

    const query = 'SELECT * FROM project'

    pool.query(query, (err, result) => {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }

        let dbresult = result.rows
        dbresult.forEach(element => {

            let number = element.id;
            let project_name = element.project_name;
            let project_note = element.project_note;
            let project_description = element.project_description;
            let project_image = element.project_image;
            let project_image_description = element.project_image_description;
            let bFeatured = element.bFeatured;

            featuredCards += `<div class="card border-dark shadow-lg text-center" data-aos="fade-in" data-aos-duration="1500" data-aos-delay="100">
                  <img src="' . $project_image . '" class="card-img-top" alt="' . $project_image_description . '">
                  <div class="card-body">
                     <h5>"' . $project_name . '"</h5>
                  </div>
                  <div class="card-footer">
                     <p>"' . $project_note . '"</p>
                     <!-- <a href="#" class="btn btn-primary w-100">View Project</a> -->
                     <button type="button" class="btn btn-primary w-100" data-toggle="modal" data-target="#Modal' . $number . '">
                        View Project
                     </button>
                  </div>
               </div>`
            featuredModals += `<!-- Modal -->
                <div class="modal fade" id="Modal' . $number . '" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="ModalLabel">' . $project_name . '</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body"> ' . $project_description . '
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                        </div>
                    </div>
                </div>`
        });





    })

    pool.end();

    res.json({
        dbresult,
        "cards": featuredCards,
        "modal": featuredModals
    })

    // // username = req.cookies.username
    // if (res.locals.logedIn) {
    //     res.redirect('/users')
    // } else {
    //     res.render('index', {
    //         title: 'PRC Engineering',
    //         activeNav: 'index',
    //         featuredCards
    //     })
    // }
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
