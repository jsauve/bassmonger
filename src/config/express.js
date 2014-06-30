var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


module.exports = function(app, passport){
    app.use(logger);
    app.use(cookieParser);
    app.use(passport.initialize());
}
