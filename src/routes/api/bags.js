var path = require('path');
var request = require('request');
var _ = require('lodash');
var mongoose = require('mongoose');
var Bag = mongoose.model('Bags');
var Teams = mongoose.model('Team');
var log = require(path.join(__dirname,'../../util/log'))(module);
var verifyRole = require(path.join(__dirname,'../../util/authenticationRoles'));

module.exports = function(app, passport) {
    app.get('/api/v1/tournaments/:tournamentId/bags',function(req,res){
        Bag.find({_tournament:req.params.tournamentId}).populate('_team').exec(function(error,bags){
            if(error){
                res.send('500');
            } else {
                res.send(bags);
            }
        });
    });

    app.get('/api/v1/teams/:teamId/bags',function(req,res){
        Bag.find({_team:req.params.teamId}).exec(function(error,bags){
            if(error){
                res.send('500');
            } else {
                res.send(bags);
            }
        });
    });

    app.delete('/api/v1/tournaments/:tournamentId/bags/:bagId', verifyRole.Admin, function(req,res){
        Bag.findByIdAndRemove(req.params.bagId, {}, function(error){
            if(error){
                res.send(500);
            } else{
                res.send(200);
            }
        });
    });

    app.post('/api/v1/tournaments/:tournamentId/bags', verifyRole.Admin, function(req,res){
        var bag = new Bag();
        _.extend(bag,req.body);
        bag._team = bag.teamId;
        bag._tournament = req.params.tournamentId;
        bag.save(function(err){
            if(err){
                res.send(500);
                log.error('ermahgerd');
                log.error(err);
            } else {
                res.send(201);
            }
        });
    });

    app.put('/api/v1/tournaments/:tournamentId/bags/:bagId', verifyRole.Admin, function(req,res){
        delete req.body._id;
        Bag.update({_id:req.params.bagId}, {$set: req.body}, {upsert: true},
            function(err){
                if(err){
                    res.send(500);
                } else{
                    res.send(200);
                }
            });
    });
}
