var path = require('path');
var request = require('request');
var _ = require('lodash');
var mongoose = require('mongoose');
var Tournament = mongoose.model('Tournament');

module.exports = function(app, passport) {
    require('./authorization')(app,passport);
    require('./tournaments')(app,passport);
    require('./teams')(app,passport);
    require('./bags')(app,passport);
    require('./standings')(app,passport);
};