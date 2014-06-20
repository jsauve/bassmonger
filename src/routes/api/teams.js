/**
 * Created by jkrebs on 6/20/14.
 */
var path = require('path');
var request = require('request');
var _ = require('lodash');
var mongoose = require('mongoose');
var Team = mongoose.model('Team');
var TeamMember = mongoose.model('TeamMember');
var log = require(path.join(__dirname,'../../util/log'))(module);

module.exports = function(app, passport) {
    app.get('/api/v1/teams',function(req,res){
        Team.find({}).exec(function(error,teams){
            if(error){
                res.send('500');
            } else {
                res.send(teams);
            }
        });
    });

    app.get('/api/v1/teams/:teamId',function(req,res){
        Team.findById(req.params.teamId,{},{},function(error,team){
            if(error){
                res.send(500);
            } else {
                res.send(team);
            }
        });
    });
}
