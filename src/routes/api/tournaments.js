var path = require('path');
var request = require('request');
var _ = require('lodash');
var mongoose = require('mongoose');
var Tournament = mongoose.model('Tournament');
var log = require(path.join(__dirname,'../../util/log'))(module);
var Bag = mongoose.model('Bags');
var Teams = mongoose.model('Team');

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

    app.get('/api/v1/tournaments/:tournamentId/results',function(req,res){
        Bag.aggregate([
            {
                $match:{
                    _tournament: mongoose.Types.ObjectId(req.params.tournamentId)
                }

            },
            {
                $group:{
                _id:'$_team',
                total:{
                    $sum:'$totalWeight'
                },
                bigBass:{
                    $max:'$bigBass.weight'
                }
            }},
            {$sort:{
                total:-1
            }}
        ]).exec(function(error,bags){
            if(error){
                log(error);
                res.send(500);
            } else {
                function parallel(fn) {
                    parallel.callback.count = parallel.callback.count + 1 || 1;
                    return function () {
                        fn.apply(fn, arguments);
                        if (!--parallel.callback.count) parallel.callback();
                    }
                }

                parallel.callback = function () {
                    res.send(bags);
                };
                _.forEach(bags,function(teamWeight){

                    Teams.findOne({_id: teamWeight._id}).exec(parallel(function(err,data){
                        teamWeight.team = data;
                    }));

                });
            }
        });
    });


}