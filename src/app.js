var express = require("express");
var logfmt = require("logfmt");
var app = express();
var fs = require('fs');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var connect = function(){
    mongoose.connect(process.env.MONGOHQ_URL || 'mongodb://bassmonger:bigberthathebuttsister@kahana.mongohq.com:10008/app26201214');
};

connect();

mongoose.connection.on('error',function(err){
    console.log(err);
})

mongoose.connection.on('disconnected',function(){
    connect();
});

var configureApp = function(){
    app.use(logfmt.requestLogger());
    app.use(express.static('./public'));
    app.use(logger);
    app.use(cookieParser);
    app.use(bodyParser);

    app.use(session({secret: process.env.SESSIONSECRET || 'hellokittyadventures'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
};

configureApp();
//bootstrap Models
var modelsPath = __dirname + '/models';

fs.readdirSync(modelsPath).forEach(function(file){
   if(~file.indexOf('.js')){
       require(modelsPath + '/' + file);
   }
});

var routes = require('./routes/routes.js');
routes.addRoutes(app,passport);

app.get('/',function(req,res){
    res.sendfile('./public/index.html!');
});

/*app.all('*//*', function(req, res, next) {
    res.sendfile('./public/index.html');
});*/

app.all('/public/*', function(req, res, next) {
    res.sendfile(req.path);
});

require('./routes/api/v1').addRoutes(app,passport);

var port = Number(process.env.PORT || 5000);

app.listen(port,function(){
   console.log("listing on port - " + port);
});
