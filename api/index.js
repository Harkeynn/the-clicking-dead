const qs = require('querystring')
const accountController = require('./controllers/account')
const leaderboardController = require('./controllers/leaderboard')

var express = require('express')
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const app = express()
const port = 1973

var passport = require('passport');
var flash    = require('connect-flash');

require('./middlewares/passport')(passport); // pass passport for configuration

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(session({
    secret: 'vidyapathaisalwaysrunning',
    resave: true,
    saveUninitialized: true
} )); // session secret

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./routes')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);


