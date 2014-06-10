var express = require("express");
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());

app.use(express.static('./public'));
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
