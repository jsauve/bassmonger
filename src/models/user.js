var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var crypto = require('crypto');

// User
var User = new Schema({
    firstName:{type:String, required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true},
    token:{type:String,required:false},
    refreshToken:{type:String,required:false}
});

var UserModel = mongoose.model('Users', User);

var Client = new Schema({
    clientId:{type:String,required:true},
    clientSecret:{type:String,required:true},
    callbackUrl:{type:String,required:true},
    clientType:{type:String,required:true}
});

var ClientModel = mongoose.model('Clients',Client);

// RefreshToken
var RefreshToken = new Schema({
    userId: {
        type: String,
        required: true
    },
    clientId: {
        type: String,
        required: true
    },
    token: {
        type: String,
        unique: true,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

var RefreshTokenModel = mongoose.model('RefreshTokens', RefreshToken);
module.exports.ClientModel = ClientModel;
module.exports.UserModel = UserModel;
module.exports.RefreshTokenModel = RefreshTokenModel;