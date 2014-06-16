var mongoose = require('mongoose');
var config = require('./config');

var connect = function(){
    mongoose.connect(process.env.MONGOHQ_URL || config.get('mongoose:uri'));
};

mongoose.connection.on('error',function(err){
    console.log(err);
})

mongoose.connection.on('disconnected',function(){
    connect();
});

module.exports = function(){
    connect();
}