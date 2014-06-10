var express = require("express");
var logfmt = require("logfmt");
var app = express();
var fs = require('fs');
var mongoose = require('mongoose');

var connect = function(){
    mongoose.connect(ENV['MONGOHQ_URL']);
};

connect();

mongoose.connection.on('error',function(err){
    console.log(err);
})

mongoose.connection.on('disconnected',function(){
    connect();
});

app.use(logfmt.requestLogger());

app.use(express.static('./public'));

//bootstrap Models
var modelsPath = __dirname + '/models';

fs.readdirSync(modelsPath).forEach(function(file){
   if(~file.indexOf('.js')){
       require(modelsPath + '/' + file);
   }
});

app.get('/',function(req,res){
    res.sendfile('./public/index.html!');
});

/*app.all('*//*', function(req, res, next) {
    res.sendfile('./public/index.html');
});*/

app.all('/public/*', function(req, res, next) {
    res.sendfile(req.path);
});

require('./api/v1').addRoutes(app, undefined);

var port = Number(process.env.PORT || 5000);

app.listen(port,function(){
   console.log("listing on port - " + port);
});
