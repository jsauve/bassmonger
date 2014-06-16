var path = require('path');
var request = require('request');
var _ = require('lodash');
var mongoose = require('mongoose');
var Tournament = mongoose.model('Tournament');

module.exports = function(app, passport) {
    app.get('/api/test',function(req,res){
        var tourney = new Tournament({lake:'white bear',name:'testTourney'});
        tourney.save(function(error){
            if(error){
                console.log(error);
            }
        });
       res.send(tourney);
    });

    app.get('/api/tournaments',function(req,res){
       Tournament.find({}).exec(function(error,tournies){
           if(error){
                res.send('500');
           } else {
               res.send(tournies);
           }
       });
    });
};