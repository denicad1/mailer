if (process.env.NODE_ENV !== 'production') require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
const exphbs = require('express-handlebars')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const nodemailer=require('nodemailer');
const sgMail = require('@sendgrid/mail');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = jQuery = require('jquery')(window);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var emailRouter=require('./routes/email');
const exp = require('constants');

var app = express();

// view engine setup
app.engine('.hbs', exphbs.engine({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views')
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(express.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/email',emailRouter);

//need to finish post with form fields and then submit to see if email works. then style everything.
app.post('/email',async(req,res)=>{
  // const mailAccount=nodemailer.createTestAccount();
  // const transport=nodemailer.createTransport();
  console.log(req.body);
 
  const msg = {
    to: 'denicad@msn.com', // Change to your recipient
    from: 'denicad@msn.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
    res.render('/');
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
