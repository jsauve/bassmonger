var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TournamentSchema = new Schema({
    lake:{type:String,default:'',trim:true},
    date:{type:Date,default:Date.now},
    name:{type:String,default:'',trim:true}
});

mongoose.model('Tournament',TournamentSchema);

