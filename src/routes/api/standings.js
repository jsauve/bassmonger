var path = require('path');
var request = require('request');
var _ = require('lodash');
var mongoose = require('mongoose');
var Bag = mongoose.model('Bags');
var Tournaments = mongoose.model('Tournament');
var Teams = mongoose.model('Team');
var log = require(path.join(__dirname,'../../util/log'))(module);

module.exports = function(app, passport) {
    app.get('/api/v1/standings',function(req,res){

        Bag.aggregate([
            {$group:{
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
       })
    });

}

