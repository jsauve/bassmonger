var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var BagsSchema = new Schema({
    _team:{type:ObjectId,ref:'Team'},
    _tournament:{type:ObjectId,ref:'Tournament'},
    totalWeight:{type:Number,required:true},
    bigBass:{
        weight:{type:Number,required:false},
        wasSmallie:{type:Boolean,required:false,default:false}
    },
    numberOfBass:{type:Number},
    numberOfSmallies:{type:Number},
    numberOfWalleyes:{type:Number},
    numberOfCrappies:{Type:Number},
    numberOfBluegills:{Type:Number},
    numberOfPike:{Type:Number}
});

mongoose.model('Bags',BagsSchema);