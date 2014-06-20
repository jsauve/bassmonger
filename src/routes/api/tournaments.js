var path = require('path');
var request = require('request');
var _ = require('lodash');
var mongoose = require('mongoose');
var Tournament = mongoose.model('Tournament');
var log = require(path.join(__dirname,'../../util/log'))(module);

module.exports = function(app, passport) {

    app.get('/api/v1/tournaments',function(req,res){
        Tournament.find({}).exec(function(error,tournies){
            if(error){
                res.send('500');
            } else {
                res.send(tournies);
            }
        });
    });

    app.get('/api/v1/tournaments/:tournamentId',function(req,res){
        Tournament.findById(req.params.tournamentId,{},{},function(error,tournament){
            if(error){
                res.send(500);
            } else {
                res.send(tournament);
            }
        });
    });



}