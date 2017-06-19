var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var session = require('express-session')
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressValidator = require('express-validator')
var flash = require('connect-flash');
var mongo = require('mongodb')
var mongoose = require('mongoose')

mongoose.connect('mongodb://farid:farid@ds161901.mlab.com:61901/my_match')
// mongoose.connect('mongodb://localhost/my_match')

var app = express();

var index = require('./routes/index');
var users = require('./routes/users');

// view engine setup
// Make the 'views' folder the starting point for any route that uses res.render
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({defaultLayout:'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'crescent.png')));
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
// app.set('trust proxy', 1) // trust first proxy 
app.use(session({
  secret: "farid's secret",
  resave: true,
  saveUninitialized: true,
  // cookie: { secure: true }
}))

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, error_message, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;
 
    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      error_message: error_message,
      value: value
    };
  }
}));

// Connect Flash
app.use(flash());

app.use(function (req, res, next) {
  res.locals.success_message = req.flash('success_message');
  res.locals.error_message = req.flash('error_message');
  res.locals.error = req.flash('error');
  next();
});

// Any routes that being with root ('/') use the 'index.js' route file
app.use('/', index);

// Any routes that being with '/users' use the 'users.js' route file
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// app.use(function(err, req, res, next) {
//   set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   render the error page
//   res.status(err.status || 500);
//   // res.render('error');
// });

var port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log("Listening on port " + port)
	if (process.send) {
		process.send({ event:'online', url:'http://localhost:' + port})
	}
})

module.exports = app;