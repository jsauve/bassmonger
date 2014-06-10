var path = require('path');
var request = require('request');
var _ = require('lodash');
var mongoose = require('mongoose');

exports.addRoutes = function(app) {
    app.get('/api/test',function(req,res){
        mongoose.connect(ENV['MONGOHQ_URL']);
        var Tournament = mongoose.model('Tournament',{date: Date,name:String,lake:String});
        var tourney = new Tournament({date:new Date(),name:'testTourney', lake:'White Bear'});
        tourney.save(function(error){
            if(error){
                console.log(error);
            }
        });
       res.send(tourney);
    });
};