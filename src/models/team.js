var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TeamMember = new Schema({
    firstName:{type:String,default:'',trim:true},
    lastName:{type:String,default:'',trim:true},
    phoneNumber:{type:String,default:'',trim:true},
    email:{type:String,default:'',trim:true}
});

mongoose.model('TeamMember',TeamMember);

var Team = new Schema({
    name:{type:String,default:'',trim:true},
    members:[TeamMember],
    nickname:{type:String,default:'',trim:true}
});

mongoose.model('Team',Team);

