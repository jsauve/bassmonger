var path = require('path');
var request = require('request');
var _ = require('lodash');
var mongoose = require('mongoose');
var Bag = mongoose.model('Bags');
var Teams = mongoose.model('Team');
var log = require(path.join(__dirname,'../../util/log'))(module);

module.exports = function(app, passport) {
    app.get('/api/v1/tournaments/:tournamentId/bags',function(req,res){
        Bag.find({tournamentId:req.params.tournamentId}).exec(function(error,bags){
            if(error){
                res.send('500');
            } else {
                res.send(bags);
            }
        });
    });

    app.get('/api/v1/teams/:teamId/bags',function(req,res){
        Bag.find({teamId:req.params.teamId}).exec(function(error,bags){
            if(error){
                res.send('500');
            } else {
                res.send(bags);
            }
        });
    });
}
