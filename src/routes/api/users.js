var path = require('path');
var request = require('request');
var _ = require('lodash');
var mongoose = require('mongoose');
var Teams = mongoose.model('Team');
var Users = mongoose.model('Users');
var log = require(path.join(__dirname,'../../util/log'))(module);
var verifyRole = require(path.join(__dirname,'../../util/authenticationRoles'));

module.exports = function(app, passport) {
    app.get('/api/v1/users/:token',function(req,res){
        Users.findOne({token:req.params.token}).exec(function(error, user){
           if(error){
               res.send(500);
           }
            res.send(user);
        });
    });
};
