var path = require('path');
var request = require('request');
var _ = require('lodash');
var mongoose = require('mongoose');
var Tournament = mongoose.model('Tournament');

exports.addRoutes = function(app) {
    app.get('/api/test',function(req,res){
        var tourney = new Tournament({lake:'white bear',name:'testTourney'});
        tourney.save(function(error){
            if(error){
                console.log(error);
            }
        })
       res.send(tourney);
    });
};