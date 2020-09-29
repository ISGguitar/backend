//test app
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
//data base
const MongoClient = require('mongodb').MongoClient;
//data base session
const MongoStore = require('connect-mongo')(session);
//routes
// const index = require('./routes/index');
const api = require('./routes/api');
//authCheck
// checkAuthorization = require('./utils/checkAuthorization').checkAuthorization;

const app = express();

const uri = 'mongodb://localhost/test';
// let db = mongoose.connect(uri);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
	secret:'neko neko desu',
	resave: false,
	saveUninitialized: true,
	cookie: {path:'/', httpOnly: true, secure: false, maxAge: 60000},
	store: new MongoStore({
	 	url : uri,
    // email : undefined
		// ttl : 1 * 24 * 60 * 60 // = 2 days. Default
	})
}));

app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);

app.use('/api', api);
// app.use('/users', checkAuthorization, users);
// app.use('/products', checkAuthorization, products);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
