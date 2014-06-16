var flash = require('connect-flash');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');

module.exports = function(app){
    app.use(express.static('./public'));
    app.use(logger);
    app.use(cookieParser);
    app.use(bodyParser);
    app.use(session({secret: process.env.SESSIONSECRET || 'hellokittyadventures'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
}
