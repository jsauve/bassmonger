var path = require('path');
var request = require('request');
var _ = require('lodash');

exports.addRoutes = function(app) {
    app.get('/api/test',function(req,res){
       res.send('testing hello world');
    });
};