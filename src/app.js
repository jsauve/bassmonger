var express = require("express");
var app = express();
var fs = require('fs');
var passport = require('passport');
var log = require('./util/log')(module);
var config = require('./config/config');
var mongoose = require('mongoose');
var passport = require('passport');
var google_strategy = require('passport-google-oauth').OAuth2Strategy;

require('./config/database')();
app.use(require('connect').bodyParser());

//bootstrap Models
var modelsPath = __dirname + '/models';

fs.readdirSync(modelsPath).forEach(function(file){
   if(~file.indexOf('.js')){
       require(modelsPath + '/' + file);
   }
});

var Client = mongoose.model('Clients');
var Users = mongoose.model('Users');

Client.findOne({clientType:'google'}).exec(function(error,clientInfo){
    passport.use(new google_strategy({
            clientID: clientInfo.clientId,
            clientSecret: clientInfo.clientSecret,
            callbackURL: config.get('googleAuth:callback') || clientInfo.callbackUrl
        },
        function (accessToken, refreshToken, profile, done) {
            Users.findOne({email: profile._json.email}, function (err, usr) {
                if(usr == null){
                    usr = new Users();
                    usr.email = profile._json.email;
                    usr.refreshToken = refreshToken;
                }
                usr.token = accessToken;
                usr.firstName = profile.name.givenName;
                usr.lastName = profile.name.familyName;
                usr.save(function (err, usr, num) {
                    if (err) {
                        log.error(err);
                    } else {
                        process.nextTick(function () {
                            return done(null, profile);
                        });
                    }
                });
                /*process.nextTick(function () {
                    return done(null, profile);
                });*/
            });
        }
    ));
    require('./config/express')(app,passport);
});

var routes = require('./routes/routes.js')(app,passport);

require('./routes/api/v1')(app,passport);

var port = Number(process.env.PORT || 5000);

app.listen(port,function(){
   log.info("listing on port - " + port);
});
