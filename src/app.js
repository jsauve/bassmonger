var express = require("express");
var app = express();
var fs = require('fs');
var passport = require('passport');
var log = require('./util/log')(module);
var config = require('./config/config');

require('./config/database')();

//bootstrap Models
var modelsPath = __dirname + '/models';

fs.readdirSync(modelsPath).forEach(function(file){
   if(~file.indexOf('.js')){
       require(modelsPath + '/' + file);
   }
});

var routes = require('./routes/routes.js')(app,passport);

require('./routes/api/v1')(app,passport);

var port = Number(process.env.PORT || 5000);

app.listen(port,function(){
   log.info("listing on port - " + port);
});
