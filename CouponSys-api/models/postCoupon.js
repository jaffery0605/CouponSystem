const mongoose = require('mongoose');

var PostCoupons = mongoose.model('postCoupons',
    {
        name:{type:String},
        code:{type:String,unique: true},
        cat:{type:String},
        cost:{type:Number},
        numof:{type:Number},
        fromdate:{type:String},
        todate:{type:String},
    },"postCoupons")

module.exports =  { PostCoupons }