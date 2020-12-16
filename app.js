require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon')

const { Pool } = require('pg')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const helmet = require('helmet')
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', './images/ico/favicon-16x16.png')))


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());


// app.use((req, res, next) => {

//     const connectionString = process.env.DATABASE_URL;

//     const pool = new Pool({ connectionString: connectionString });

//     // const { Pool } = require('pg')

//     // const pool = new Pool({
//     //     user: '',
//     //     host: '',
//     //     database: '',
//     //     password: ''
//     // })
//     const query = 'SELECT * FROM project'
//     // const userInput = 42

//     pool.query(query, (err, result) => {
//         // If an error occurred...
//         if (err) {
//             console.log("Error in query: ")
//             console.log(err);
//         }

//         // Log this to the console for debugging purposes.
//         console.log("Back from DB with result:");
//         console.log(result);
//     })

//     pool.end();

//     next()
// })





app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
