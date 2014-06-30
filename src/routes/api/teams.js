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
var verifyRole = require(path.join(__dirname,'../../util/authenticationRoles'));

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

    app.delete('/api/v1/teams/:teamId', verifyRole.Admin, function(req,res){
        Team.findByIdAndRemove(req.params.teamId, {}, function(error,team){
            if(error){
                res.send(500);
            } else{
                res.send(200);
            }
        });
    });

    app.post('/api/v1/teams', verifyRole.Admin, function(req,res){
        var team = new Team();
        _.extend(team,req.body);
        team.save(function(err){
            if(err){
                res.send('500');
                log.Error(err);
            } else {
                res.send('201');
            }
        });
    });

    app.put('/api/v1/teams/:teamId', verifyRole.Admin, function(req,res){
        delete req.body._id;
        Team.update({_id:req.params.teamId}, {$set: req.body}, {upsert: true},
            function(err){
                if(err){
                    res.send(500);
                } else{
                    res.send(200);
                }
            });
    });
}
