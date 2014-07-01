var mongoose = require('mongoose');
var Users = mongoose.model('Users');

module.exports.Admin = function(req, res, next){
    var token = req.header('Authorization');
    if(!token){
        res.send(401);
    }
    Users.findOne({token:token}).exec(function(err,user){
        if(err){
            res.send(500);
        }
        if(!user || !user.isAdmin){
            res.send(401);
        } else {
            next();
        }
    });
};

module.exports.LoggedIn = function(req,res,next){
    var token = req.header('Authorization');
    if(!token){
        res.send(401);
    }
    Users.findOne({token:token}).exec(function(err,user){
        if(err){
            res.send(500);
        }
        if(!user){
            res.send(401);
        } else {
            next();
        }
    });
};